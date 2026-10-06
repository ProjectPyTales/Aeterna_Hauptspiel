# Projekt-Richtlinien

## Token-sparend arbeiten
- Knapp berichten: Ergebnis, offene Punkte, Links. Keine langen Zwischenberichte.
- Sichtprüfung (Screenshots, Klickpfad) läuft weiter lokal und in der CI, wird aber nicht ausführlich vorgelegt:
  nur melden, wenn etwas fehlschlägt oder ein Bild wirklich angesehen werden muss.
- Bestehenden Code nicht ungefragt erneut auf Fehler durchsuchen – nur bei konkreten Problemen, auf die der
  Nutzer hinweist. Geprüft wird nur, was in der Sitzung neu oder geändert ist.

## Pull Requests
- Am Ende einer Sitzung den eigenen Pull Request automatisch nach `main` mergen, sobald die CI grün ist
  (Merge-Commit, kein Squash). Nicht auf eine Freigabe warten.
