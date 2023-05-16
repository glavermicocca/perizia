CREATE TABLE "perizia" (
	"id"	INTEGER NOT NULL,
	"stato"	TEXT,
	"anno"	TEXT,
	"valore"	TEXT,
	"uuid"	TEXT,
	"descrizione"	TEXT,
	"periodo"	TEXT,
	"valuta"	TEXT,
	"zecca"	TEXT,
	"lega_metallica"	TEXT,
	"orientamento_asse"	TEXT,
	"peso"	TEXT,
	"diametro"	TEXT,
	"spessore"	TEXT,
	"conservazione"	TEXT,
	"rarita"	TEXT,
	"note"	TEXT,
	"variante"	TEXT,
	"contorno"	TEXT,
	"riferimento"	TEXT,
	"data_perizia"	TEXT,
	"added"	TEXT,
	"collegamento"	TEXT,
    "veridicita" INTEGER,
	"collezione" TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "immagini" (
	"id"	INTEGER,
	"originalname"	TEXT,
    "filename"  TEXT
);

CREATE TABLE "errori_di_coniazione" (
	"id"	INTEGER NOT NULL,
	"id_perizia"	INTEGER,
	"macro_categoria"	TEXT,
	"categoria"	TEXT,
	"ripetitivita"	INTEGER,
	"codice"	TEXT,
	"descrizione"	TEXT,
	"riferimento_esterno"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);