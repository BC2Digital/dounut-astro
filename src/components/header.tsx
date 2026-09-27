import { BasketButton } from "./basket-button";

export const Header = () => {
  return (
    <header className="container flex justify-between items-center mx-auto py-10 w-full">
      <a href="/" title="Hella Confeitaria" className="flex flex-col leading-none">
        <span className="text-2xl font-bold tracking-tight text-text">Hella</span>
        <span className="text-xs uppercase tracking-[0.3em] text-text/70">Confeitaria</span>
      </a>
      <a href="/cart" title="Seu carrinho">
        <BasketButton />
      </a>
    </header>
  );
};
