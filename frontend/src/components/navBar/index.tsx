"use client";

import { useState, useEffect } from 'react';
import { Search, MenuBurger, Home, Close, Profil, PlusCircle, CalendarIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logos";
import { Button } from '@/components/ui/button';
import { fetchUser } from "@/lib/data";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from "@/lib/login";
import { isAdmin as isLoggedAdmin } from "@/lib/data";
import { usePathname } from 'next/navigation';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // État de chargement
    const [isAdmin, setIsAdmin] = useState(false); // État admin
    const router = useRouter(); // Pour la redirection
    const pathname = usePathname();

    useEffect(() => {
        // Fonction pour charger l'utilisateur
        const loadUser = async () => {
            try {
                const userData = await fetchUser();
                setUser(userData); // userData sera null si non connecté
            } catch (err) {
                console.error("Erreur lors de la récupération de l'utilisateur :", err);
            } finally {
                setIsLoading(false); // Fin du chargement, que ce soit avec ou sans utilisateur
            }
        };

        loadUser();

        // Fonction pour vérifier le statut admin
        const checkAdmin = async () => {
            try {
                const adminStatus = await isLoggedAdmin();
                setIsAdmin(adminStatus);
            } catch (err) {
                console.error("Erreur lors de la vérification du statut admin :", err);
            }
        };

        checkAdmin();
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        logout(router).then(() => setUser(null));
    };

    return (
        <nav className="bg-secondary text-primary shadow-md">
            <div className="flex items-center justify-between mx-auto py-4 w-10/12">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center">
                        <Logo className="w-40" />
                    </Link>
                    <Link
                        href="/search"
                        className="hidden lg:flex items-center space-x-2 block py-2 px-3 rounded hover:bg-background font-medium text-base"
                    >
                        <span className='lg:hidden xl:block'>Rechercher</span>
                        <Search className="w-5 h-5 min-w-5" aria-hidden="true" />
                    </Link>
                    {user && (
                        <>
                            <Link
                                href="/event/create"
                                className="hidden lg:flex items-center space-x-2 py-2 px-3 rounded hover:bg-background font-medium text-base"
                            >
                                <span className='lg:hidden xl:block'>Créer un événement</span>
                                <PlusCircle className="w-5 h-5 min-w-5" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/calendar"
                                className="hidden lg:flex items-center space-x-2 block py-2 px-3 rounded hover:bg-background font-medium text-base"
                            >
                                <span className='lg:hidden xl:block'>Calendrier</span>
                                <CalendarIcon className="w-5 h-5 min-w-5" aria-hidden="true" />
                            </Link>
                        </>
                    )}
                </div>

                <div className="hidden lg:flex space-x-4 items-center">
                    {/* Condition pour afficher les boutons en fonction de l'état de l'utilisateur */}
                    {user ? (
                        <>
                            <Link href="/profile" className="md:flex items-center space-x-2 block py-2 px-3 rounded hover:bg-background font-medium text-base">
                                <span>Profil</span>
                                <Profil className="w-5 h-5 min-w-5" aria-hidden="true" />
                            </Link>
                            <Button onClick={handleLogout} className="hover:bg-primary/70">Se déconnecter</Button>
                            {isAdmin && (
                                <Link
                                    href="/admin"
                                    target="_blank"
                                    className="flex items-center space-x-2 rtl:space-x-reverse block py-2 rounded font-medium text-xl"
                                >
                                    <Button variant={"secondary"} >Admin</Button>
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link href="/register">
                                <Button className="hover:bg-primary/70">S'enregistrer</Button>
                            </Link>
                            <Link href="/login">
                                <Button className="hover:bg-primary/70">Se connecter</Button>
                            </Link>
                        </>
                    )}
                </div>
                <Button variant={'none'}
                    type="button"
                    className="inline-flex items-center p-2 justify-center text-sm text-primary rounded-lg lg:hidden transition-all duration-300"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <Close className="w-8" /> : <MenuBurger className="w-8" />}
                </Button>
            </div>
            <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-mobile">
                <ul className="font-medium flex flex-col py-4 rounded-lg bg-secondary items-end w-10/12 m-auto">
                    <li>
                        <Link
                            href="/"
                            className="flex items-center space-x-2 rtl:space-x-reverse block py-1 px-3 rounded font-medium text-xl"
                        >
                            <span>Accueil</span>
                            <Home className="w-5 h-5" aria-hidden="true" />
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/search"
                            className="flex items-center space-x-2 rtl:space-x-reverse block py-2 px-3 rounded font-medium text-xl"
                        >
                            <span>Rechercher</span>
                            <Search className="w-5 h-5" aria-hidden="true" />
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link
                                    href="/event/create"
                                    className="flex items-center space-x-2 rtl:space-x-reverse block py-2 px-3 rounded font-medium text-xl"
                                >
                                    <span>Créer un événement</span>
                                    <PlusCircle className="w-5 h-5" aria-hidden="true" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/calendar"
                                    className="flex items-center space-x-2 rtl:space-x-reverse block py-2 px-3 rounded font-medium text-xl"
                                >
                                    <span>Calendrier</span>
                                    <CalendarIcon className="w-5 h-5" aria-hidden="true" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="flex items-center space-x-2 rtl:space-x-reverse block py-2 px-3 rounded font-medium text-xl">
                                    <span>Profil</span>
                                    <Profil className="w-5 h-5" aria-hidden="true" />
                                </Link>
                            </li>
                            <li>
                                <Button onClick={handleLogout} className="hover:bg-primary/70 mt-2">Se déconnecter</Button>
                            </li>
                            {isAdmin && (
                                <li>
                                    <Link
                                        href="/admin"
                                        target="_blank"
                                        className="flex items-center space-x-2 rtl:space-x-reverse block py-2 rounded font-medium text-xl"
                                    >
                                        <Button variant={"secondary"} >Admin</Button>
                                    </Link>
                                </li>
                            )}
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href="/register"
                                    className="flex items-center block px-3 py-1 rounded font-medium"
                                >
                                    <Button className="mt-2">S'enregistrer</Button>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/login"
                                    className="flex items-center block px-3 py-1 rounded font-medium"
                                >
                                    <Button className="mt-2">Se connecter</Button>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}