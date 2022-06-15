var penisEffect;


function checkForm(){
    var discordIDSubmitted = document.getElementById('profile').value.toString();
    console.log(discordIDSubmitted);
    console.log(penisEffect.users[discordIDSubmitted])
    document.getElementById("discordName").innerHTML = "Discord Name: "+penisEffect.users[discordIDSubmitted].discordUsername
    document.getElementById("steamID").innerHTML = "Steam ID: "+penisEffect.users[discordIDSubmitted].steamID
    document.getElementById("achievementsUnlocked").innerHTML = "Achievements Unlocked: "+Object.keys(penisEffect.users[discordIDSubmitted].achievements).length;
    let sortedInput = penisEffect.users[discordIDSubmitted].listeningHistory.slice(1).sort((a, b) => b.timesPlayed - a.timesPlayed);
    if(sortedInput[0] != undefined && sortedInput[0].songName != undefined && sortedInput[0].artist != undefined) {
        mostListenedToSong = `Most Listened To Song: ${sortedInput[0].songName} by ${sortedInput[0].artist}`;
    } else {
        mostListenedToSong = "No songs have been listened to yet.";
    }
    document.getElementById("mostListened").innerHTML = mostListenedToSong
    return false;
}

fetch('https://gist.githubusercontent.com/spjoes/de0ed9feb278f8b1e011a3a0a37ca383/raw/testEggiumProfileViewer.json')
  .then(response => response.json())
  .then(data => {
    penisEffect = data;
  })
  .catch(err => console.log(err))
