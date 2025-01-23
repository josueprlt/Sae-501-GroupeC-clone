import { useRouter } from 'next/navigation';


export async function login(
  email: string,
  password: string,
  router: useRouter
): Promise<void> {
  try {
    const response = await fetch('https://localhost:443/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (response.ok) {
      // Connexion réussie, rediriger vers la page d'accueil
      router.push('/');
    } else if (response.status === 401) {
        throw new Error('Identifiant ou mot de passe invalide');
    } else {
        const errorData = await response.json();
        throw new Error(errorData.errors || 'Erreur de connexion');
    }
} catch (error: any) {
    if (error.message === 'Identifiant ou mot de passe invalide') {
      throw error;
    } else {
      throw new Error('Erreur du serveur, veuillez réessayer plus tard.');
    }
  }
}


export async function logout(router: useRouter): Promise<void> {
  try {
    const response = await fetch('https://localhost:443/api/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      router.push('/');
    } else {
      throw new Error('Erreur lors de la déconnexion');
    }
  } catch (error) {
    throw new Error('Erreur lors de la déconnexion');
  }
}


export async function register(
  email: string,
  name: string,
  firstname: string,
  password: string,
  router: useRouter
): Promise<void> {
  try {
    const response = await fetch('https://localhost:443/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, firstname, password }),
      credentials: 'include',
    });

    if (response.ok) {
      router.push('/');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors || 'Erreur lors de l\'inscription');
    }
  } catch (error) {
    throw new Error('Erreur lors de l\'inscription');
  }
}


export async function sendRecoverPassword(email: string): Promise<void> {
  try {
    const response = await fetch('https://localhost:443/api/password/recover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi du mail');
    }
  } catch (error) {
    throw new Error('Erreur lors de l\'envoi du mail');
  }
}


export async function resetPassword(
  password: string,
  token: string,
  router: useRouter
): Promise<void> {
  try {
    const response = await fetch('https://localhost:443/api/password/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
      credentials: 'include',
    });

    if (response.ok) {
      router.push('/login');
    } else {
      throw new Error('Erreur lors de la réinitialisation du mot de passe');
    }
  } catch (error) {
    throw new Error('Erreur lors de la réinitialisation du mot de passe');
  }
}