import React from "react";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="safe-area-inset-x safe-area-inset-y flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6">
      <div className="xs:max-w-sm w-full max-w-xs space-y-6 text-center sm:max-w-md sm:space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo-promosdamih.png"
            alt="Promos da Mih"
            width={100}
            height={100}
            className="rounded-full shadow-lg sm:h-[140px] sm:w-[140px]"
          />
        </div>

        {/* Título com efeito de pulsação */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="animate-grow-shrink mobile-small-title text-2xl leading-tight font-bold text-gray-900 sm:text-4xl">
            A Black Friday
            <br />
            está chegando!
          </h1>

          <p className="mobile-small xs:px-2 xs:text-base px-1 text-sm leading-relaxed text-gray-600 sm:px-0 sm:text-lg">
            Prepare-se para receber as melhores
            <br />
            promoções do maior evento do ano.
          </p>
        </div>

        {/* Botão do Telegram */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl transition-shadow duration-300 active:shadow-lg sm:rounded-3xl sm:p-5 sm:hover:shadow-2xl">
          <a
            href="https://t.me/promosdamih"
            target="_blank"
            rel="noopener noreferrer"
            className="group touch-target flex w-full items-center justify-between rounded-xl p-3 text-left transition-all duration-200 select-none active:bg-gray-100 sm:rounded-2xl sm:hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0088cc] shadow-lg sm:h-12 sm:w-12">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white sm:h-6 sm:w-6"
                  fill="currentColor"
                >
                  <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 2.1 11.75c-1.21-.35-1.22-1.22.26-1.81L21.26 2.2c1.01-.4 1.9.24 1.48 1.86L20.18 17.9c-.18.97-.72 1.21-1.47.75L14.51 16.5 11.9 19c-.39.39-.71.71-1.44.71-.94 0-.78-.35-.78-.78z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-base font-bold text-gray-900 sm:text-lg">
                  Entre no grupo do Telegram
                </div>
                <div className="text-xs font-medium text-gray-500 sm:text-sm">
                  60.000 Membros
                </div>
              </div>
            </div>
            <svg
              className="h-5 w-5 text-gray-400 transition-colors duration-200 group-active:text-blue-500 sm:h-6 sm:w-6 sm:group-hover:text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        {/* Texto e imagem dos merchants */}
        <div className="space-y-4 sm:space-y-6">
          <p className="text-base font-semibold text-gray-700 sm:text-lg">
            Conexões diretas com:
          </p>

          <div className="flex justify-center rounded-xl bg-white p-3 shadow-lg sm:rounded-2xl sm:p-4">
            <Image
              src="/merchant.png"
              alt="Merchants parceiros"
              width={260}
              height={60}
              className="h-auto w-full max-w-[260px] object-contain sm:max-w-[300px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
