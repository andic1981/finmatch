CREATE TABLE financing_sources (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('official','regional','editorial')),
  tier INTEGER NOT NULL CHECK(tier IN (1,2,3)),
  proxy TEXT NOT NULL DEFAULT 'auto' CHECK(proxy IN ('auto','basic','stealth','enhanced')),
  enabled INTEGER NOT NULL DEFAULT 1 CHECK(enabled IN (0,1)),
  builtin INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'untested',
  last_checked TEXT,
  last_http_status INTEGER,
  last_error TEXT,
  final_url TEXT,
  last_scan TEXT,
  last_successful_scan TEXT,
  revision INTEGER NOT NULL DEFAULT 1,
  changed_by TEXT NOT NULL DEFAULT 'migration',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE source_url_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_id TEXT NOT NULL,
  old_url TEXT NOT NULL,
  new_url TEXT NOT NULL,
  changed_by TEXT NOT NULL,
  changed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX source_history_lookup ON source_url_history(source_id, id);
CREATE TABLE source_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TRIGGER source_url_changed AFTER UPDATE OF url ON financing_sources
WHEN OLD.url <> NEW.url
BEGIN
  INSERT INTO source_url_history(source_id,old_url,new_url,changed_by)
  VALUES(NEW.id,OLD.url,NEW.url,NEW.changed_by);
END;
INSERT INTO financing_sources(id,host,name,url,type,tier,proxy,builtin) VALUES('mfe.gov.ro','mfe.gov.ro','mfe.gov.ro','https://mfe.gov.ro/category/ultimele-apeluri-prima-pagina/','official',1,'enhanced',1);
INSERT INTO financing_sources(id,host,name,url,type,tier,proxy,builtin) VALUES('adrvest.ro','adrvest.ro','adrvest.ro','https://adrvest.ro/programul-tranzitie-justa-ghiduri-de-finantare-active/','official',1,'auto',1);
INSERT INTO financing_sources(id,host,name,url,type,tier,proxy,builtin) VALUES('adrnordest.ro','adrnordest.ro','adrnordest.ro','https://www.adrnordest.ro','official',1,'enhanced',1);
INSERT INTO financing_sources(id,host,name,url,type,tier,proxy,builtin) VALUES('oportunitati-ue.gov.ro','oportunitati-ue.gov.ro','oportunitati-ue.gov.ro','https://oportunitati-ue.gov.ro','official',1,'auto',1);
INSERT INTO financing_sources(id,host,name,url,type,tier,proxy,builtin) VALUES('afir.ro','afir.ro','afir.ro','https://afir.ro','official',1,'auto',1);
INSERT INTO financing_sources(id,host,name,url,type,tier,proxy,builtin) VALUES('commission.europa.eu','commission.europa.eu','commission.europa.eu','https://commission.europa.eu/funding-tenders/find-funding/eu-funding-programmes_ro','official',1,'auto',1);
INSERT INTO financing_sources(id,host,name,url,type,tier,proxy,builtin) VALUES('cinea.ec.europa.eu','cinea.ec.europa.eu','cinea.ec.europa.eu','https://cinea.ec.europa.eu/funding-and-tenders_en','official',1,'auto',1);
INSERT INTO financing_sources(id,host,name,url,type,tier,proxy,builtin) VALUES('fonduri-structurale.ro','fonduri-structurale.ro','fonduri-structurale.ro','https://www.fonduri-structurale.ro','editorial',3,'auto',1);
INSERT INTO financing_sources(id,host,name,url,type,tier,proxy,builtin) VALUES('startupcafe.ro','startupcafe.ro','StartupCafe','https://www.startupcafe.ro/finantari','editorial',3,'auto',1);
INSERT INTO financing_sources(id,host,name,url,type,tier,proxy,builtin) VALUES('eeagrants.ro','eeagrants.ro','eeagrants.ro','https://www.eeagrants.ro/apeluri?filtru_status=Activ','official',1,'auto',1);
