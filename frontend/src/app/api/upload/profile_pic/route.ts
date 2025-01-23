import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads/profile_pictures');


export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('fileName');

  if (!fileName) {
    return NextResponse.json({ error: 'Nom de fichier non fourni' }, { status: 400 });
  }

  const filePath = path.join(uploadDir, fileName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Fichier non trouvé' }, { status: 200 });
  }

  try {
    fs.unlinkSync(filePath);
    return NextResponse.json({ message: 'Fichier supprimé avec succès' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur lors de la suppression du fichier' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  // console.log('--- POST /api/upload received ---');

  if (!fs.existsSync(uploadDir)) {
    // console.log('Creating upload directory:', uploadDir);
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  // Convertir `NextRequest` en `IncomingMessage` pour `formidable`
  const httpReq = transformNextRequest(req);

  return new Promise((resolve) => {
    form.parse(httpReq, (err, fields, files) => {
      if (err) {
        // console.error('Error while parsing form:', err);
        resolve(NextResponse.json({ error: 'Erreur lors du téléchargement' }, { status: 500 }));
        return;
      }

      console.log('Fields:', fields);
      console.log('Files:', files);

      const file = files.file ? files.file[0] : null;
      if (!file) {
        // console.error('No file uploaded!');
        resolve(NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 }));
        return;
      }

      // Générer un nom unique basé sur le timestamp et un identifiant aléatoire
      const timestamp = Date.now(); // Timestamp actuel
      const randomSuffix = Math.floor(Math.random() * 1e6); // Suffixe aléatoire (jusqu'à 1 million)
      const fileExtension = path.extname(file.originalFilename || 'image.jpg'); // Extension du fichier
      const uniqueFileName = `${timestamp}_${randomSuffix}${fileExtension}`; // Nom unique basé sur le timestamp et un suffixe

      // Chemin complet pour le nouveau fichier
      const newFilePath = path.join(uploadDir, uniqueFileName);
      console.log('Renaming file from:', file.filepath, 'to:', newFilePath);

      fs.rename(file.filepath, newFilePath, (renameErr) => {
        if (renameErr) {
          // console.error('Error renaming file:', renameErr);
          resolve(NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 }));
        } else {
          const publicImageUrl = `${uniqueFileName}`;
          console.log('File uploaded successfully:', publicImageUrl);
          resolve(
            NextResponse.json(
              {
                message: 'Téléchargement réussi',
                fileName: uniqueFileName, // Nom du fichier généré
                url: publicImageUrl, // URL publique de l'image
              },
              { status: 200 }
            )
          );
        }
      });
    });
  });
}

// Fonction pour convertir `NextRequest` en `IncomingMessage`
function transformNextRequest(nextRequest: NextRequest): IncomingMessage {
  const readable = Readable.from(nextRequest.body ?? []);
  const req = readable as unknown as IncomingMessage;

  req.headers = Object.fromEntries(nextRequest.headers.entries());
  req.method = nextRequest.method || 'POST';
  req.url = nextRequest.url || '';

  return req;
}










