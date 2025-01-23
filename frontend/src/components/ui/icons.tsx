import { SVGAttributes } from "react";

function Clock(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.26" d="M3.757 2.274a2.52 2.52 0 00-1.782 1.782M11.36 2.274a2.52 2.52 0 011.78 1.782"></path>
      <path fill="currentColor" fillRule="evenodd" d="M7.558 12.896a5.039 5.039 0 100-10.078 5.039 5.039 0 000 10.078zm.63-7.558a.63.63 0 00-1.26 0V7.7c0 .434.353.787.788.787h1.732a.63.63 0 000-1.26h-1.26v-1.89z" clipRule="evenodd"></path>
    </svg>
  );
}

function LocationOn(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" {...props}>
      <path fill="currentColor" d="M7.558 14.39a.586.586 0 01-.378-.127.765.765 0 01-.236-.33 8.766 8.766 0 00-.756-1.654c-.294-.514-.708-1.118-1.244-1.81a14.25 14.25 0 01-1.307-1.984c-.325-.63-.488-1.391-.488-2.284 0-1.228.425-2.267 1.276-3.117.86-.861 1.905-1.292 3.133-1.292s2.267.43 3.118 1.292c.86.85 1.29 1.89 1.29 3.117 0 .956-.183 1.753-.55 2.394-.357.63-.772 1.254-1.244 1.873-.567.756-.997 1.386-1.291 1.89a8.896 8.896 0 00-.709 1.575.71.71 0 01-.252.346.616.616 0 01-.362.11zm0-6.614c.44 0 .814-.152 1.118-.457a1.52 1.52 0 00.457-1.118c0-.44-.153-.813-.457-1.118a1.52 1.52 0 00-1.118-.456c-.44 0-.813.152-1.118.456a1.52 1.52 0 00-.457 1.118c0 .441.153.814.457 1.118a1.52 1.52 0 001.118.457z"></path>
    </svg>
  );
}



function PeopleFill(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" {...props}>
      <g clipPath="url(#clip0_374_526)">
        <path fill="currentColor" d="M6.612 13.99s-.945 0-.945-.945c0-.944.945-3.778 4.723-3.778s4.723 2.834 4.723 3.778c0 .945-.945.945-.945.945H6.612zm3.778-5.667a2.834 2.834 0 100-5.667 2.834 2.834 0 000 5.667zM4.927 13.99a2.116 2.116 0 01-.204-.945c0-1.28.642-2.597 1.828-3.513a5.95 5.95 0 00-1.828-.265C.945 9.267 0 12.101 0 13.045c0 .945.945.945.945.945h3.982zM4.25 8.323a2.361 2.361 0 100-4.723 2.361 2.361 0 000 4.723z"></path>
      </g>
      <defs>
        <clipPath id="clip0_374_526">
          <path fill="currentColor" d="M0 0H15.113V15.113H0z" transform="translate(0 .766)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function LockClosedIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}

function LockOpenIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}

function AddEvent(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 163 163" {...props}>
      <rect width="32.662" height="138.812" x="78.66" y="10.158" fill="currentColor" rx="5" transform="rotate(11.034 78.66 10.158)">
      </rect>
      <rect width="32.662" height="138.812" x="152.655" y="78.66" fill="currentColor" rx="5" transform="rotate(101.034 152.655 78.66)"
      ></rect>
    </svg>
  );
}

function Search(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      data-slot="icon"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      ></path>
    </svg>
  );
}

function Calendar(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      data-slot="icon"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
      ></path>
    </svg>
  );
}

function Profil(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      data-slot="icon"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      ></path>
    </svg>
  );
}

function MenuBurger(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      data-slot="icon"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      ></path>
    </svg>
  );
}

function Home(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      data-slot="icon"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      ></path>
    </svg>
  );
}

function Close(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      data-slot="icon"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  );
}

function Instagram(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
      <path fill="url(#paint0_linear_537_1588)" d="M20 0c-5.428 0-6.11.025-8.242.12-2.133.1-3.585.435-4.858.93a9.75 9.75 0 00-3.543 2.308A9.75 9.75 0 001.05 6.9C.555 8.17.217 9.625.12 11.75.025 13.887 0 14.568 0 20.003c0 5.43.025 6.11.12 8.242.1 2.13.435 3.582.93 4.855a9.823 9.823 0 002.308 3.542 9.76 9.76 0 003.54 2.308c1.274.495 2.725.832 4.854.93 2.135.095 2.816.12 8.248.12 5.433 0 6.11-.025 8.245-.12 2.127-.1 3.585-.435 4.857-.93a9.75 9.75 0 003.54-2.308A9.823 9.823 0 0038.95 33.1c.492-1.273.83-2.725.93-4.855.095-2.133.12-2.813.12-8.245 0-5.432-.025-6.113-.12-8.248-.1-2.127-.438-3.582-.93-4.852a9.75 9.75 0 00-2.308-3.543A9.75 9.75 0 0033.1 1.05C31.825.555 30.37.217 28.242.12 26.108.025 25.43 0 19.995 0H20zm-1.793 3.605h1.796c5.34 0 5.972.018 8.08.115 1.95.087 3.01.415 3.715.687.932.363 1.6.798 2.3 1.498.7.7 1.132 1.365 1.495 2.3.274.703.6 1.762.687 3.713.097 2.107.117 2.74.117 8.077s-.02 5.973-.117 8.08c-.087 1.95-.415 3.008-.688 3.713a6.25 6.25 0 01-1.497 2.297c-.7.7-1.365 1.133-2.3 1.495-.7.275-1.76.6-3.713.69-2.107.095-2.74.117-8.08.117s-5.974-.022-8.082-.117c-1.95-.09-3.008-.415-3.713-.69a6.25 6.25 0 01-2.3-1.495 6.25 6.25 0 01-1.5-2.3c-.272-.703-.6-1.762-.687-3.712-.095-2.108-.115-2.74-.115-8.083 0-5.342.02-5.97.115-8.077.09-1.95.415-3.01.69-3.716.362-.932.797-1.6 1.497-2.3.7-.7 1.365-1.132 2.3-1.495.705-.274 1.763-.6 3.713-.69 1.845-.085 2.56-.11 6.287-.112v.005zm12.47 3.32a2.4 2.4 0 100 4.799 2.4 2.4 0 000-4.799zM20.003 9.73a10.272 10.272 0 10-.321 20.542 10.272 10.272 0 00.32-20.542zm0 3.602a6.668 6.668 0 110 13.337 6.668 6.668 0 010-13.337z"></path>
      <defs>
        <linearGradient id="paint0_linear_537_1588" x1="20" x2="20" y1="0" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8E37AA"></stop>
          <stop offset="0.495" stopColor="#E14268"></stop>
          <stop offset="1" stopColor="#FA901B"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

function Facebook(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
      <g clipPath="url(#clip0_537_1589)">
        <path fill="#007CF7" d="M40 20.122C40 9.008 31.045-.003 20-.003 8.95 0-.005 9.007-.005 20.125c0 10.043 7.315 18.367 16.875 19.877V25.94h-5.075v-5.815h5.08v-4.438c0-5.042 2.988-7.827 7.555-7.827 2.19 0 4.477.392 4.477.392v4.95h-2.522c-2.483 0-3.258 1.553-3.258 3.146v3.774h5.546l-.885 5.816h-4.663V40C32.685 38.49 40 30.165 40 20.122z"></path>
      </g>
      <defs>
        <clipPath id="clip0_537_1589">
          <path fill="#fff" d="M0 0H40V40H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function Whatsapp(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
      <g clipPath="url(#clip0_537_1591)">
        <path fill="#4AC557" d="M34.002 5.815A19.626 19.626 0 0019.985 0C9.068 0 .17 8.895.16 19.815c0 3.498.915 6.9 2.643 9.913L0 40l10.51-2.755a19.75 19.75 0 009.475 2.413h.01c10.92 0 19.815-8.895 19.825-19.825a19.751 19.751 0 00-5.818-14.018zM19.985 36.303a16.5 16.5 0 01-8.39-2.3l-.6-.36-6.235 1.635 1.665-6.083-.39-.627a16.4 16.4 0 01-2.518-8.763c0-9.065 7.393-16.46 16.478-16.46a16.4 16.4 0 0111.65 4.828 16.4 16.4 0 014.82 11.65c-.01 9.097-7.403 16.48-16.48 16.48zm9.038-12.335c-.493-.248-2.925-1.445-3.383-1.615-.455-.163-.788-.248-1.113.247-.332.493-1.282 1.615-1.567 1.938-.285.332-.58.37-1.075.125-.493-.25-2.09-.77-3.98-2.463-1.475-1.312-2.463-2.937-2.758-3.43-.284-.495-.027-.76.22-1.007.218-.22.493-.58.74-.865.25-.285.333-.495.495-.825.163-.335.085-.62-.037-.868-.125-.247-1.113-2.69-1.53-3.675-.4-.972-.808-.837-1.113-.85-.285-.017-.617-.017-.95-.017a1.826 1.826 0 00-1.322.617c-.455.495-1.728 1.693-1.728 4.135 0 2.443 1.775 4.79 2.025 5.123.246.332 3.486 5.33 8.458 7.48 1.175.512 2.1.815 2.822 1.045 1.188.38 2.26.322 3.116.2.95-.145 2.927-1.2 3.345-2.358.41-1.16.41-2.15.285-2.357-.123-.21-.456-.333-.95-.58z"></path>
      </g>
      <defs>
        <clipPath id="clip0_537_1591">
          <path fill="#fff" d="M0 0H40V40H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function Linkedin(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40"{...props}>
      <g clipPath="url(#clip0_537_1593)">
        <path fill="#0274B3" d="M0 2.865C0 1.282 1.315 0 2.938 0h34.124C38.685 0 40 1.282 40 2.865v34.27C40 38.718 38.685 40 37.062 40H2.938C1.315 40 0 38.718 0 37.135V2.865zm12.357 30.62V15.422H6.356v18.063h6.002zm-3-20.53c2.093 0 3.396-1.385 3.396-3.12-.038-1.773-1.3-3.12-3.355-3.12C7.343 6.715 6 8.065 6 9.835c0 1.735 1.303 3.12 3.318 3.12h.04zm12.27 20.53V23.398c0-.54.04-1.08.2-1.465.433-1.078 1.42-2.195 3.08-2.195 2.173 0 3.04 1.654 3.04 4.085v9.662h6.003v-10.36c0-5.55-2.96-8.13-6.91-8.13-3.185 0-4.613 1.75-5.412 2.982v.063h-.04l.04-.063v-2.555h-6c.075 1.695 0 18.063 0 18.063h6z"></path>
      </g>
      <defs>
        <clipPath id="clip0_537_1593">
          <path fill="#fff" d="M0 0H40V40H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function Mail(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
      <g>
        <path fill="#000" d="M.125 8.887A5 5 0 015 5h30a5 5 0 014.875 3.887L20 21.035.125 8.887zM0 11.742v17.76l14.508-8.894L0 11.742zm16.902 10.333L.477 32.142A5 5 0 005 35h30a5 5 0 004.52-2.86L23.095 22.073 20 23.965l-3.098-1.89zm8.59-1.465L40 29.503v-17.76L25.492 20.61z"
        ></path>
      </g>
    </svg>
  );
}

function LinkIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 30" {...props}>
      <g fill="#000">
        <path d="M6.325 12.765L2.47 16.407C.888 17.9 0 19.925 0 22.037s.888 4.137 2.47 5.63C4.05 29.162 6.195 30 8.432 30c2.236 0 4.38-.839 5.962-2.332l5.137-4.854a7.896 7.896 0 002.073-3.218 7.539 7.539 0 00.275-3.758 7.747 7.747 0 00-1.585-3.456A8.352 8.352 0 0017.204 10l-1.647 1.555a2.673 2.673 0 00-.433.528c.94.256 1.794.738 2.476 1.4a5.239 5.239 0 011.414 2.376 5.024 5.024 0 01-.02 2.725 5.25 5.25 0 01-1.45 2.356L12.41 25.79c-1.055.996-2.485 1.556-3.977 1.556-1.491 0-2.922-.56-3.977-1.556-1.054-.996-1.647-2.346-1.647-3.755 0-1.409.593-2.76 1.647-3.756l2.23-2.102a10.036 10.036 0 01-.36-3.413z"></path>
        <path d="M10.693 7.185c-1.04.9-1.815 2.004-2.26 3.218a6.943 6.943 0 00-.3 3.758c.248 1.255.84 2.441 1.728 3.457s2.043 1.833 3.37 2.382l2.377-2.06a6.41 6.41 0 01-2.748-1.374c-.761-.66-1.308-1.48-1.586-2.38a4.622 4.622 0 010-2.748c.279-.9.826-1.72 1.587-2.38l5.601-4.851c1.15-.997 2.711-1.556 4.338-1.556 1.627 0 3.188.56 4.338 1.556s1.797 2.347 1.797 3.755c0 1.41-.646 2.76-1.797 3.756l-2.43 2.103a9.31 9.31 0 01.392 3.416l4.206-3.642C31.03 12.101 32 10.075 32 7.964c0-2.112-.97-4.138-2.694-5.631C27.58.839 25.24 0 22.802 0c-2.44 0-4.78.839-6.504 2.333l-5.605 4.852z"></path>
      </g>
    </svg>
  );
}

function User(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      data-slot="icon"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm4.735 6c.618 0 1.093-.561.872-1.139a6.002 6.002 0 00-11.215 0c-.22.578.254 1.139.872 1.139h9.47z"></path>
    </svg>
  );
}

function Filtre(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="15"
      fill="none"
      viewBox="0 0 17 15"
      {...props}
    >
      <path
        fill="#1B1B1B"
        d="M16.035 12.477a.565.565 0 01-.566.565h-3.842a2.207 2.207 0 01-4.265 0H1.53a.565.565 0 010-1.13h5.832a2.207 2.207 0 014.265 0h3.842a.565.565 0 01.566.565zm0-9.953a.565.565 0 01-.566.565h-1.846a2.207 2.207 0 01-4.264 0H1.53a.565.565 0 010-1.13H9.36a2.208 2.208 0 014.264 0h1.846a.558.558 0 01.566.565zm0 4.973a.559.559 0 01-.566.565H6.654a2.208 2.208 0 01-4.265 0H1.53a.565.565 0 010-1.13h.86a2.208 2.208 0 014.264 0h8.815a.565.565 0 01.566.565z"
      ></path>
    </svg>
  );
}
function ArrowLeft(props: SVGAttributes<SVGElement>) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.4999 30.0001L11.2919 28.7921L10.0839 30.0001L11.2919 31.208L12.4999 30.0001ZM42.4999 31.7084C43.4434 31.7084 44.2082 30.9435 44.2082 30.0001C44.2082 29.0566 43.4434 28.2917 42.4999 28.2917V31.7084ZM21.2919 18.7921L11.2919 28.7921L13.7079 31.208L23.7079 21.208L21.2919 18.7921ZM11.2919 31.208L21.2919 41.208L23.7079 38.7921L13.7079 28.7921L11.2919 31.208ZM12.4999 31.7084H42.4999V28.2917H12.4999V31.7084Z" fill="#33363F" />
    </svg>
  );
}

function PlusCircle(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12.75 8a.75.75 0 0 0-1.5 0zm-1.5 8a.75.75 0 0 0 1.5 0zM8 11.25a.75.75 0 0 0 0 1.5zm8 1.5a.75.75 0 0 0 0-1.5zM11.25 8v8h1.5V8zM8 12.75h8v-1.5H8zM20.25 12A8.25 8.25 0 0 1 12 20.25v1.5c5.385 0 9.75-4.365 9.75-9.75zM12 20.25A8.25 8.25 0 0 1 3.75 12h-1.5c0 5.385 4.365 9.75 9.75 9.75zM3.75 12A8.25 8.25 0 0 1 12 3.75v-1.5c-5.385 0-9.75 4.365-9.75 9.75zM12 3.75A8.25 8.25 0 0 1 20.25 12h1.5c0-5.385-4.365-9.75-9.75-9.75z"
      ></path>
    </svg>
  );
}

function CalendarIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" {...props}>
      <path d="M9 7a1 1 0 0 1 1-1h5v2h-5a1 1 0 0 1-1-1M1 9h4a1 1 0 0 1 0 2H1z" />
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
    </svg>
  );
}

function StarIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" {...props}>
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );
}

function PenIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF" {...props}>
      <path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path>
    </svg>
  );
}

function EyeIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFFFFF" viewBox="0 0 16 16" {...props}>
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
    </svg>
  );
}

function DeleteIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg  fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  );
}

function ModifyIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  );
}


export { Clock, LocationOn, PeopleFill, LockClosedIcon, LockOpenIcon, Search, AddEvent, Calendar, Profil, MenuBurger, Home, Close, Instagram, Facebook, Whatsapp, Linkedin, Mail, LinkIcon, User, Filtre, ArrowLeft, PlusCircle, CalendarIcon, StarIcon, PenIcon, EyeIcon, DeleteIcon, ModifyIcon };