import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";

type Position = { x: number; y: number };

interface MenusContextType {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  position: Position | null;
  setPosition: (pos: Position) => void;
}

const MenusContext = createContext<MenusContextType | null>(null);

export const Menus = ({ children }: { children: ReactNode }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<Position | null>(null);

  const open = (id: string) => setOpenId(id);
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      <div className="relative">{children}</div>
    </MenusContext.Provider>
  );
};

export const Toggle = ({ id }: { id: string }) => {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Toggle must be used within Menus");

  const { openId, open, close, setPosition } = context;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openId === id) {
      close();
    } else open(id);
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded transition"
    >
      <HiEllipsisVertical className="w-6 h-6 " />
    </button>
  );
};

export const List = ({ id, children }: { id: string; children: ReactNode }) => {
  const context = useContext(MenusContext);
  if (!context) throw new Error("List must be used within Menus");

  const { openId, position, close } = context;

  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  if (openId !== id || !position) return null;

  return createPortal(
    <ul
      ref={ref}
      className="absolute z-50  shadow-lg rounded-md text-sm w-40 text-text-primary bg-primary"
      style={{ right: position.x, top: position.y }}
    >
      {children}
    </ul>,
    document.body
  );
};

export const Button = ({
  children,
  icon,
  onClick,
}: {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
}) => {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Button must be used within Menus");

  const { close } = context;

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-input hover:text-text-primary transition text-left"
      >
        {icon}
        {children}
      </button>
    </li>
  );
};
Menus.Menu = Menus;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;