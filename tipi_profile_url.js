// ==UserScript==
// @name        Add links on JIRA issues to Tipi profile and to copy cmdlet to check existing AAD accounts
// @namespace   Violentmonkey Scripts
// @match       https://jira.zhp.pl/*
// @grant       none
// @version     2.1
// @author      Norbert Piątkowski
// @homepageURL https://github.com/norberto5/zhp_jira_helpers
// @supportURL  https://github.com/norberto5/zhp_jira_helpers/issues
// @downloadURL https://raw.githubusercontent.com/norberto5/zhp_jira_helpers/main/tipi_profile_url.js
// @description Last update: 05.05.2023 - added user name copying link and Powershell cmdlet search copying link
// ==/UserScript==

if (typeof JIRA !== 'undefined')
{
  JIRA.bind(JIRA.Events.ISSUE_REFRESHED, addLinks);
  JIRA.bind(JIRA.Events.REFRESH_ISSUE_PAGE, addLinks);
}
addLinks();

function addLinks()
{
  var propertyList = document.getElementsByClassName("property-list")[0];

  if(propertyList == null)
  {
    return;
  }

  var linkElement = createLinkToUserProfile();
  if(linkElement)
  {
    propertyList.appendChild(linkElement);
  }

  var copyElement = createCopyUserName();
  if(copyElement)
  {
    propertyList.appendChild(copyElement);
  }

  var pwshElement = createCopyPowershellCheck();
  if(pwshElement)
  {
    propertyList.appendChild(pwshElement);
  }
}

function createLinkToUserProfile()
{
  let userId = getUserId();

  var profileUrl = "";
  if(isNaN(userId))
  {
    profileUrl = "<b>BŁĄD</b>";
  }
  else if(!userId)
  {
    return;
  }
  else
  {
    var userIdString = userId.toString();
    profileUrl = `<a href="https://tipi.zhp.pl/persons/${userIdString}/detail#data" target="_blank" title="Śledź łącze">Profil w Tipi</a>`;
  }

  var newElement = document.createElement("li");
  newElement.innerHTML += `<div class="wrap"><strong title="URL" class="name">Tipi:</strong><div class="value">${profileUrl}</div></div>`;
  newElement.classList.add("item");
  return newElement;
}

function createCopyUserName()
{
  var userName = getUserName();

  if(!userName || userName == " ")
  {
    return;
  }

  var newElement = document.createElement("li");
  var searchUrl = `<a onclick="navigator.clipboard.writeText('${userName}')">Skopiuj ''${userName}''</a>`;
  newElement.innerHTML += `<div class="wrap"><strong title="URL" class="name">Kopiuj do schowka:</strong><div class="value">${searchUrl}</div></div>`;
  newElement.classList.add("item");
  return newElement;
}

function createCopyPowershellCheck()
{
  var userName = getUserName();

  if(!userName || userName == " ")
  {
    return;
  }

  var newElement = document.createElement("li");

  var pwsh = "";
  pwsh = "Get-User -Filter {DisplayName -like &quot;" + userName + "&quot;}| Select DisplayName,UserPrincipalName,Title,Office,Department | Format-Table";

  var searchUrl = `<a onclick="navigator.clipboard.writeText('${pwsh}')">Skopiuj sprawdzenie w Powershell</a>`;
  newElement.innerHTML += `<div class="wrap"><strong title="URL" class="name">Powershell:</strong><div class="value">${searchUrl}</div></div>`;
  newElement.classList.add("item");
  return newElement;
}

function getUserId()
{
  var propertyField = document.getElementById("customfield_10611-val");

  if(!propertyField)
  {
    propertyField = document.getElementById("customfield_10615-val");

    if(!propertyField)
    {
      return "";
    }
  }

  var zhpId = propertyField.innerText;

  if(!zhpId)
  {
    return "";
  }

  if(zhpId.length != 11)
  {
    return NaN;
  }

  return (zhpId.substr(5) * 1);
}

function getUserName()
{
  var firstNameField = document.getElementById("customfield_10702-val");
  var lastNameField = document.getElementById("customfield_10713-val");

  if(!firstNameField || !lastNameField)
  {
    return "";
  }

  var firstName = firstNameField.innerText;
  var lastName = lastNameField.innerText;

  return firstName + " " + lastName;
}
