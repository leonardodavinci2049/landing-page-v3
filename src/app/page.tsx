"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import brazilianNames from "../mock/brazilian-names.json";

const HomePage = () => {
  const [availableSpots, setAvailableSpots] = useState<number>(0);
  const [currentNotification, setCurrentNotification] = useState<{
    name: string;
    visible: boolean;
  }>({ name: "", visible: false });

  useEffect(() => {
    // Gera número inicial aleatório entre 20-30
    const initialSpots = Math.floor(Math.random() * 11) + 20;
    setAvailableSpots(initialSpots);

    // Configura o contador decrescente
    const spotsInterval = setInterval(() => {
      setAvailableSpots((prev) => {
        if (prev <= 1) {
          return 1; // Para em 1 para manter urgência
        }
        // Decresce entre 1-3 vagas aleatoriamente a cada intervalo
        const decrease = Math.floor(Math.random() * 3) + 1;
        return Math.max(1, prev - decrease); // Garante que nunca fique menor que 1
      });
    }, 5000); // 5 segundos entre cada decremento

    return () => clearInterval(spotsInterval);
  }, []);

  // Controla as notificações de novos membros
  useEffect(() => {
    const showNotification = () => {
      // Seleciona um nome aleatório
      const randomIndex = Math.floor(
        Math.random() * brazilianNames.names.length,
      );
      const selectedName = brazilianNames.names[randomIndex].name;

      // Mostra a notificação
      setCurrentNotification({ name: selectedName, visible: true });

      // Esconde após 1.5 segundos
      setTimeout(() => {
        setCurrentNotification((prev) => ({ ...prev, visible: false }));
      }, 1500);
    };

    // Primeira notificação após 3 segundos
    const initialTimeout = setTimeout(showNotification, 3000);

    // Notificações subsequentes a cada 8-12 segundos (aleatório)
    const notificationInterval = setInterval(() => {
      showNotification();
    }, 10000); // Intervalo base de 10 segundos

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(notificationInterval);
    };
  }, []);
  return (
    <div className="safe-area-inset-x safe-area-inset-y flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6">
      <div className="xs:max-w-sm w-full max-w-xs space-y-4 text-center sm:max-w-md sm:space-y-4">
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
        <div className="space-y-2 sm:space-y-3">
          <h1 className="animate-grow-shrink mobile-small-title text-3xl leading-tight font-bold text-gray-900 sm:text-5xl">
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

        {/* Botões de contato */}
        <div className="space-y-3">
          {/* Botão do Telegram */}
          <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-xl transition-shadow duration-300 active:shadow-lg sm:rounded-3xl sm:p-4 sm:hover:shadow-2xl">
            <a
              href="https://t.me/promosdamih"
              target="_blank"
              rel="noopener noreferrer"
              className="group touch-target flex w-full items-center justify-between rounded-xl p-2 text-left transition-all duration-200 select-none active:bg-gray-100 sm:rounded-2xl sm:hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0088cc] shadow-lg sm:h-10 sm:w-10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-white sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 2.1 11.75c-1.21-.35-1.22-1.22.26-1.81L21.26 2.2c1.01-.4 1.9.24 1.48 1.86L20.18 17.9c-.18.97-.72 1.21-1.47.75L14.51 16.5 11.9 19c-.39.39-.71.71-1.44.71-.94 0-.78-.35-.78-.78z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-900 sm:text-base">
                    Entre no grupo do Telegram
                  </div>
                  <div className="text-xs font-bold text-[#0088cc] uppercase">
                    GRUPO VIP Vagas limitadas!
                  </div>
                </div>
              </div>
              <svg
                className="h-4 w-4 text-gray-400 transition-colors duration-200 group-active:text-blue-500 sm:h-5 sm:w-5 sm:group-hover:text-blue-500"
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

          {/* Botão do WhatsApp */}
          <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-xl transition-shadow duration-300 active:shadow-lg sm:rounded-3xl sm:p-4 sm:hover:shadow-2xl">
            <a
              href="https://chat.whatsapp.com/De5309ucKW31uEAp4Bhbox"
              target="_blank"
              rel="noopener noreferrer"
              className="group touch-target flex w-full items-center justify-between rounded-xl p-2 text-left transition-all duration-200 select-none active:bg-gray-100 sm:rounded-2xl sm:hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] shadow-lg sm:h-10 sm:w-10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-white sm:h-5 sm:w-5"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-900 sm:text-base">
                    Entre no grupo do WhatsApp
                  </div>
                  <div className="text-xs font-bold text-[#25D366] uppercase">
                    GRUPO VIP Vagas limitadas!
                  </div>
                </div>
              </div>
              <svg
                className="h-4 w-4 text-gray-400 transition-colors duration-200 group-active:text-green-500 sm:h-5 sm:w-5 sm:group-hover:text-green-500"
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
        </div>

        {/* Seção de Escassez */}
        <div
          className={`space-y-2 rounded-2xl p-3 text-center sm:p-5 ${
            availableSpots <= 50
              ? "animate-pulse bg-gradient-to-br from-gray-50 to-gray-100"
              : "bg-gradient-to-br from-gray-50 to-gray-100"
          }`}
        >
          <div className="text-xs font-bold tracking-widest text-red-600 uppercase sm:text-sm">
            DISPONÍVEL
          </div>
          <div
            className={`font-black ${
              availableSpots <= 50
                ? "animate-bounce text-3xl text-red-800 sm:text-4xl"
                : "text-2xl text-red-700 sm:text-3xl"
            }`}
          >
            {availableSpots} {availableSpots === 1 ? "VAGA" : "VAGAS"}
          </div>
          <div className="text-sm font-semibold text-gray-700 sm:text-base">
            Já somos + 35 mil membros.
          </div>
          {availableSpots <= 20 && (
            <div className="animate-pulse text-xs font-bold text-red-800 uppercase">
              ⚠️ ÚLTIMAS VAGAS!
            </div>
          )}
        </div>

        {/* Texto e imagem dos merchants */}
        <div className="space-y-2 sm:space-y-2">
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

      {/* Notificação de Novo Membro */}
      <div
        className={`fixed right-4 bottom-4 z-50 transform transition-all duration-700 ease-in-out ${
          currentNotification.visible
            ? "translate-x-0 scale-100 opacity-100"
            : "translate-x-full scale-95 opacity-0"
        }`}
      >
        <div className="flex max-w-sm items-center space-x-3 rounded-lg border-l-4 border-green-500 bg-white px-4 py-3 shadow-xl">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-green-600">
              Novo membro!
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">
                {currentNotification.name}
              </span>{" "}
              entrou no grupo
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
