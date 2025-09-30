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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg sm:h-12 sm:w-12">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white sm:h-7 sm:w-7"
                  fill="currentColor"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.185 1.894-.893 6.552-.893 6.552-.377 2.61-1.405 3.066-2.309 3.066-.631 0-1.005-.323-1.283-.537L9.857 14.57c-1.008-.616-3.76-2.268-4.206-2.677-.446-.41-.474-.822-.006-1.146.468-.324 4.54-2.707 6.078-3.643l.005-.003c.518-.318 1.027-.632 1.487-.925C14.22 5.78 14.389 5.53 14.389 5.53s.844-.513 1.377-.513c.533 0 .844.513.844.513s.325.25 1.33.756c1.006.507 4.56 2.189 5.028 2.513.468.324.44.736-.006 1.146-.446.41-3.198 2.061-4.206 2.677l-3.226 2.67c-.278.214-.652.537-1.283.537-.904 0-1.932-.456-2.309-3.066 0 0-.708-4.658-.893-6.552-.185-1.894.893-2.707 2.122-2.707s2.307.813 2.122 2.707z" />
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
