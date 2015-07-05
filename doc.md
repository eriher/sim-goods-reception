Known issues: can only sync one dispatch at a time.

####Main
Main-modulen kopplar ihop applikationens olika delar och konfigurerar applikationen vid uppstart. Den ansvarar även för navigation mellan de olika vyerna inom applikationen. Ionic använder Angular-UI-Router, en AngularJS modul, vilket är ett navigationssystem baserat på vyer [39]. Det finns stöd för nästlade vyer, vilket används i menyn. Det går även att implementera mer avancerad funktionalitet vid navigation till en vy, som inläsning av data eller anrop till tjänster. Detta leder till en bättre kodstruktur då denna typ av funktionalitet samlas.

Globalization användas för att avgöra vilket språk mobilenheten använder. Denna information används sedan av Translate för att ställa in språket i applikationen. Innehåller även funktionalitet för inhämtning av tidszon.

Translate är en AngularJS modul. Användningsområde inom applikationen är stöd för språkbyte. Laddning av språk sker asynkront för att minska upplevd prestandapåverkan. Det finns stöd för svenska och engelska.

####Signin
Signin-modulen ansvarar för inloggning- och utloggningsprocessen samt lagring av användardata. 
Signin-vyn visas för användare första gången applikationen startas. Den är separat från resterande vyer i applikationen och delar inte sidhuvud eller sidomeny. Från denna vy kan användare logga in med sitt användarnamn och lösenord. Om informationen är korrekt navigeras användaren vidare till hemskärmen. Om informationen är felaktig visas lämpligt felmeddelande och användaren nekas inträde.

Signin är den enda modulen som använder en dedikerad service. Signin service ansvarar för att skicka vidare användardata vid inloggning och lagra användaruppgifter samt autentiseringsvärde under sessionen. Vid inloggning skickas användarnamn och lösenord till en RESTful server. Om uppgifterna är korrekta svarar servern med kundnummer och ett autentiseringvärde. Autentiseringvärdet kommer sedan att användas vid varje kontakt med servern under sessionen för att validera användaren. Efter lyckad inloggning sparas användarinformation lokalt för automatiskt inloggning vid senare tillfällen. Signin använder Network service vid inloggning. När användaren väljer att logga ut rensas all data, både session och persistent. Sekvensdiagramet i Figur 7.4 visar inloggningsprocessen.

####Menu
Menu-modul ansvarar för att menyn uppträder på ett enhetligt sätt genom hela applikationen. Inläsning av data till controllern utförs samtidigt som denna vy laddas. Detta gör att inga undervyer kommer laddas innan data finns. I menyn finns funktionalitet för att initiera skanning; för detta används Scan service. Det finns även funktionalitet för att initiera synkronisering som använder DataStorage service.

Menu-vyn är en abstrakt vy vilket betyder att den kan inhysa undervyer. Den består av en sidomeny, ett sidhuvud och en ram för att visa undervyer. Huvuddelen av vyn består av området där undervyer visas. Från sidomenyn nås navigation till första nivå av undervyer, som visas inom ramen. Sidhuvudet innehåller titel och knappar för streckkodskanning och synkronisering av data. Sidhuvudet visas på alla undervyer.

####Home
Home-modulen ansvarar för visning av leveranser, för initiering av synkronisering samt för navigering. Den består av en HTML-sida och en controller. Inläsning av data  till controllern görs genom navigeringssystemet. Det finns funktionalitet för att initiera synkronisering, men ansvaret för synkroniseringen ligger hos DataStorage.

Home-vyn visar en lista av kort som innehåller information om leveranser. Kort är ett vanligt sätt att presentera information inom mobila gränssnitt. Användare ska snabbt kunna få en överblick av dagens inkommande leveranser och deras status. Filtrering och sök alternativ finns tillgängligt i en subheader för att underlätta planering av inkommande leveranser. Trycker användaren på ett kort visas Pallet-vyn med mer detaljerad information om leveransens pallar.

####Pallet
Pallet-modulen ansvarar för visningen och granskningen av pallar. Det är den enda vyn i applikationen som är en andranivå undervy. Detta innebär att sidmenyn är oåtkomlig och navigationen att navigationen är begränsad till en back knapp.

Pallet-vyn listar innehållet i en leverans uppdelat efter pall. Användare ska få en överblick av pallar som ingår i en leverans och hur många som har blivit godkända. När alla pallar inom en leverans granskats markeras hela leveransen som granskad. Pallstatus visas med färgmarkering för snabb avläsning. Filter och sök funktionalitet finns även i subheadern.

####History
History-modulen ansvarar för visning av synkroniserade pallar. Den innehåller en HTML-sida och en controller. Den använder DataStorage för att hämta synkroniserade pallar.
History-vyn visar leveranser som blivit godkända och synkroniserade till servern av användaren. Dessa leveranser kan ej längre justeras. De är sorterade efter datum. Filter och sökfunktionalitet finns även i subheadern.

####Help
Help-modulen ansvarar för visning av en hjälpguide. Den består endast av en HTML sida, det vill säga endast grafiska komponenter. Ingen logik utförs här.
Vyn innehåller information om hur man hanterar applikationens funktioner. Hit ska en användare vända sig om något är oklart och kunna få den information som behövs för att lösa problem.

####About
About-modulen ansvarar för visning av licenser och språkbyte. About består av en HTML sida och en controller. 
About-vyn innehåller information om de licenser applikationen brukar och har funktionalitet för att byta språk. I nuläget finns det stöd för svenska eller engelska.

####SearchFilter
Filter är en del av AngularJS, de fungerar genom att ta in en mängd element och ge tillbaka en delmängd beroende på villkor. Filter används i applikationen för att filtrera vid sökningen, villkoret är då söksträngen. Användare ska kunna söka efter leveranser och pallar beroende på deras innehåll. Vid vanlig sökning används de filter som är inbyggda i AngularJS. Men problem uppstår när olika fält kan innehålla samma eller delar av samma teckenkombinationer. För att lösa detta används ett filter som ger funktionalitet att söka efter ett specifikt fält.

Services

####DataStorage
DataStorage ansvarar för synkronisering, sortering och lagring av data. Synkronisering används för att samordna data som finns lokalt på enheten med servern. Synkroniseringen utförs i två steg (Figur 7.5). I det första steget skickas osynkroniserad data till servern om sådan data existerar. I det andra hämtas data. DataStorage använder sig av Network service för att kommunicera med servern. Data som hämtas sorteras efter leverans och behandlas genom tillägg av information som underlättar bearbetning i applikationen. För lagring av data används Web Storage i form av Local Storage. Local Storage används för att lagra leverans-, synkroniserings- och historikdata mellan sessioner. Användarnamn och lösenord sparas även för automatisk inloggning. Local Storage valdes för att det stöds av alla plattformarna.

####Network
Network sköter kommunikation till servern genom AngularJS $http tjänst. $http tjänsten förenklar REST-anrop och möjliggör asynkron kommunikation. Den utför endast enkla HTTP-anrop till en RESTful webbtjänst och lämnar behandling av svaren till andra tjänster. Funktionalitet för inloggning, hämtning av fraktsedlar och återkoppling finns.

####Scan
Scan sköter hanteringen av streckkodsskannning. Ett insticksprogram till Cordova används för att skanning ska fungera enhetligt över alla plattformar. Insticksprogrammet har stöd för de mest standardiserade streckkoderna och specifikt Code_39 som används inom SIM. Det finns stöd för att skanna leverans-ID och pall-ID, detta för att de är unika fält som används för identifiering. Resultatet av skanningen jämförs med lokal data. Om en matchande leverans eller pall hittas navigeras användare till rätt vy, annars visas felmeddelande. 

####Toast
Toast används för att kunna visa enhetliga meddelanden i hela applikationen. Meddelanden kommer se ut på samma sätt och visas på samma position oavsett vart dom skickas ifrån. Detta gör att services kan skicka meddelanden direkt till användaren, något som vanliga fall görs genom templates. Ett insticksprogram till Cordova används för att visa enhetliga meddelanden över alla plattformar.

