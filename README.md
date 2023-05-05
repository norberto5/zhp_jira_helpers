# Skrypty pomocnicze do Jiry ZHP
Skrypty pomocnicze JavaScript do wtyczki Violentmonkey dla Jiry ZHP.

## Obecne funkcjonalności
- automatyczne dodawanie do zgłoszeń linków do:
    - sprawdzenia profilu Tipi (zgłoszenia z numerem ewidencyjnym)
    - skopiowania imienia i nazwiska zgłaszającego
    - skopiowania cmdleta PowerShell do sprawdzenia istniejących kont w AAD

# Instalacja
1. Zainstaluj wtyczkę Violentmonkey (https://violentmonkey.github.io/)
2. Dodaj we wtyczce skrypt z URL:
```
https://raw.githubusercontent.com/norberto5/zhp_jira_helpers/main/tipi_profile_url.js
```
3. Gotowe, wejdź w jakieś zgłoszenie dotyczące utworzenia konta/resetu hasła/resetu uwierzytelniania dwuskładnikowego, w którym podany jest numer ewidencyjny, aby automatycznie dodał się parametr z linkiem do profilu tej osoby w Tipi. Ponadto dodaje się link do skopiowania imienia i nazwiska, a także link do skopiowania cmdleta do wyszukania kont w AAD w PowerShellu.

# Sprawdzanie w PowerShellu

Można sprawdzić czy konto użytkownika już istnienie w naszym AAD. Aby to zrobić należy uruchomić lokalnie terminal PowerShell.

## Pierwsza instalacja modułu
```
Install-Module ExchangeOnlineManagement
```

## Importowanie modułu i połączenie się z Exchangem
```
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

## Używanie
Jak już zaimportujemy moduł i połączymy się z Exchangem to wystarczy kliknąć w zgłoszeniu "Skopiuj sprawdzenie w Powershell" i wkleić kod (Ctrl + V) do terminala, a następnie go uruchomić (Enter).

Kod generowany do sprawdzenia:

``Get-User -Filter {DisplayName -like "Imię Nazwisko"}| Select DisplayName,UserPrincipalName,Title,Office,Department | Format-Table``

Rezultat sprawdzenia wygląda mniej więcej tak:
```
DisplayName         UserPrincipalName               Title               Office                      Department
-----------         -----------------               -----               ------                      ----------
Krzysztof XYZ       k.xyz@zhp.net.pl                                    BABIMOJSKO-SULECHOWSKI      1080080053000
Krzysztof XYZ       krzysztof.xyz2@zhp.net.pl                           Chorągiew Zachodniopomorska Hufiec Szczecin
Krzysztof XYZ       krzysztof.xyz4@zhp.net.pl       AA000000000         WARSZAWA-PRAGA-POLUDNIE     1340240000000
Krzysztof XYZ       krzysztof.xyz5@zhp.net.pl                           MORAG                       1280130000000
Krzysztof XYZ       krzysztof.xyz@zhp.net.pl        AC000000000         JAWOR                       1020080000000
Krzysztof XYZ       krzysztof.xyz6@zhp.net.pl                           Hufiec Kamienna Góra
```

Jeżeli cmdlet nic nie zwróci to znaczy, że nie mamy w AAD konta z takim imieniem i nazwiskiem. Oczywiście istnieje ryzyko, że istnieje jakieś konto, w którym jest literówka i wówczas go nie odnajdziemy.