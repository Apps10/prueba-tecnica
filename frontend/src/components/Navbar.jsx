import { LogOut, User, ShoppingBag} from "lucide-react";

export const Navbar = () => {
  return (
    <header 
    className="bg-base-100 border-b border-base-300 fixed w-full top-0 
    z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
              <ShoppingBag className="w-5 h-5 text-primary"></ShoppingBag>
              <h1 className="text-lg font-bold">Mi Tienda Online</h1>
          </div>
          <div className="flex items-center gap-2">
              <User className="w-4 h-4"></User>
              <span className="hidden sm:inline">Profile</span>
            <button className="btn btn-sm gap-2 transition-colors" >
              <LogOut className="w-4 h-4"></LogOut>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};