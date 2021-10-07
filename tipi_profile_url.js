// ==UserScript==
// @name        Add link on JIRA issues to Tipi user profile
// @namespace   Violentmonkey Scripts
// @match       https://jira.zhp.pl/*
// @grant       none
// @version     1.3
// @author      Norbert Piątkowski
// @homepageURL https://github.com/norberto5/zhp_jira_helpers
// @supportURL  https://github.com/norberto5/zhp_jira_helpers/issues
// @downloadURL https://raw.githubusercontent.com/norberto5/zhp_jira_helpers/main/tipi_profile_url.js
// @description Last update: 7.10.2021
// ==/UserScript==


JIRA.bind(JIRA.Events.ISSUE_REFRESHED, addLinkToUserProfile);
JIRA.bind(JIRA.Events.REFRESH_ISSUE_PAGE, addLinkToUserProfile);
addLinkToUserProfile();

function addLinkToUserProfile()
{
  var propertyList = document.getElementsByClassName("property-list")[0];

  if(propertyList != null)
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
      profileUrl = `<a href="https://tipi.zhp.pl/persons/${userIdString}/detail#data" target="_blank" title="Śledź łącze">https://tipi.zhp.pl/persons/${userIdString}/detail#data</a>`;
    }
    
    var newElement = document.createElement("li");
    newElement.innerHTML += `<div class="wrap"><strong title="URL" class="name">URL:</strong><div class="value">${profileUrl}</div></div>`;
    newElement.classList.add("item");
    
    propertyList.appendChild(newElement);
  }
}

function getUserId()
{
  var propertyField = document.getElementById("customfield_10611-val");
  
  if(!propertyField)
  {
    return "";
  }
  
  var zhpId = propertyField.innerText;
  
  if(!zhpId)
  {
    return "";  
  }
  
  return (zhpId.substr(5) * 1);
}
