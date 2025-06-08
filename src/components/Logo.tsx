import logo from "../assets/logo.png"; 

export default function Logo() {
  return (
    <nav className="flex items-center flex-row ">
      <img src={logo} alt="Logo" className="h-8 w-auto object-fill dark:invert-75" />
      <span className="text-lg font-bold mt-2">Inkwell</span>
    </nav>
  );
}
