# Używamy oficjalnego obrazu nginx
FROM nginx:latest

# Ustawiamy katalog roboczy w kontenerze
WORKDIR /usr/share/nginx/html

# Usuwamy domyślne pliki serwera nginx
RUN rm -rf ./*

# Kopiujemy nasz projekt do katalogu roboczego w kontenerze
COPY . .

# Otwieramy port 80, na którym działa nginx
EXPOSE 80

# Domyślny punkt wejścia to serwer nginx
CMD ["nginx", "-g", "daemon off;"]
