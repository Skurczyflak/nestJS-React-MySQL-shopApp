# Merch Store

## Cel projektu

**Merch Store** to prosta aplikacja typu **full-stack shop**, która pozwala użytkownikowi przeglądać produkty, dodawać je do koszyka oraz finalizować zamówienia, a także przeglądać listę dokonanych zamówień. 

Projekt został stworzony jako przykład pełnego połączenia **frontendu** i **backendu** przy użyciu popularnych technologii webowych.

Główne funkcje aplikacji:
- przeglądanie listy dostępnych produktów,  
- wyszukiwanie produktów po nazwie,  
- dodawanie produktów do koszyka,  
- edycja ilości oraz komentarza do produktów w koszyku,  
- usuwanie produktów z koszyka,  
- składanie zamówienia,
- przeglądanie listy zamówień.

## Stack technologiczny

Aplikacja została zbudowana w oparciu o następujące technologie:
- **Backend:** Node.js + NestJS  
- **Frontend:** React  
- **Baza danych:** MySQL  
- **Biblioteki pomocnicze:** react-slick (karuzele produktów)

## Uruchomienie projektu

Aby uruchomić aplikację lokalnie, wykonaj poniższe kroki:

1. Sklonuj repozytorium:
 ```bash
 git clone https://github.com/Skurczyflak/nestJS-React-MySQL-shopApp.git
 ```
3. Przejdź do katalogu projektu:
  ```bash
  cd nestJS-React-MySQL-shopApp
  ```

3. Zainstaluj zależności:
  ```bash
  npm install
  ```

4. Uruchom aplikację:
  ```bash
  # tryb developerski
  npm run start:dev
  
  # lub tryb produkcyjny
  npm run start:prod
  ```

5. Po uruchomieniu, aplikacja będzie dostępna lokalnie pod adresem:
   
http://localhost:PORT

## Dodatkowe informacje techniczne

Projekt wykorzystuje bazę danych MySQL — w plikach konfiguracyjnych (.env) należy ustawić dane połączenia do lokalnej bazy danych (host, użytkownik, hasło, nazwa bazy).

Projekt w środowisku produkcyjnym wykorzystuje zewnętrzne API do komunikacji z bazą danych.
Ze względów bezpieczeństwa i ochrony prywatnych danych informacje dotyczące konfiguracji i autoryzacji API nie są ujawniane publicznie.
Do uruchomienia aplikacji lokalnie wystarczy skonfigurować własną bazę danych zgodnie z kodem poniżej
``` env
  DATABASE_URL="mysql://username:haslo@link:PORT/nazwa-twojej-bazy"
  PORT=TWÓJ-PROT // np 8000
```
Oraz utworzyć klient prismy i stworzyć podstawową strukturę w bazie danych
```bash
# tworzy klienta Prisma
npx prisma generate

# tworzy tabele w bazie zgodnie z modelem   
npx prisma db push
```

Aplikacja nie wymaga zewnętrznego API ani dodatkowej autoryzacji. 
Wszystkie dane o produktach i zamówieniach są przechowywane lokalnie w bazie.



## Testowanie projektu
  ```bash
  # testy jednostkowe
  npm run test
    
  # testy end-to-end
  npm run test:e2e
  
  # raport pokrycia testów
  npm run test:cov
  
  ## Budowanie projektu
  npm run build
  ```
## Linki

Repozytorium GitHub: https://github.com/Skurczyflak/nestJS-React-MySQL-shopApp

Ostatni commit: https://github.com/Skurczyflak/nestJS-React-MySQL-shopApp/commit/7bdfa56b030d084ad1f32f3b6e2843e4edc1b901

Live Demo: https://nestjs-react-mysql-shopapp.onrender.com/
