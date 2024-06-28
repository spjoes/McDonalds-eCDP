function parseLRC(lrcContent, songName, artistName) {
    const lines = lrcContent.split('\n');
    const lyrics = [];

    let previousTime = 0;

    lines.forEach((line, index) => {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (match) {
            const minutes = parseInt(match[1], 10);
            const seconds = parseFloat(match[2]);
            const text = match[3].trim();

            const currentTime = minutes * 60 + (seconds+1);
            let duration = 1;

            if (index < lines.length - 1) {
                const nextMatch = lines[index + 1].match(/\[(\d+):(\d+\.\d+)\]/);
                if (nextMatch) {
                    const nextMinutes = parseInt(nextMatch[1], 10);
                    const nextSeconds = parseFloat(nextMatch[2]);
                    const nextTime = nextMinutes * 60 + nextSeconds;
                    duration = nextTime - currentTime;
                }
            }

            if (text) {
                lyrics.push({
                    start: currentTime,
                    duration: duration,
                    text: text
                });
            }

            previousTime = currentTime;
        }
    });

    const result = {
        name: songName,
        artist: artistName,
        lyrics: lyrics
    };

    return JSON.stringify(result, null, 4);
}

// Example usage:
const lrcContent = `
[00:07.50]I got a lot to say to you
[00:10.70]Yeah, I got a lot to say
[00:14.20]I noticed your eyes are always glued to me
[00:17.80]Keeping them here
[00:19.10]And it makes no sense at all
[00:21.40]They taped over your mouth
[00:23.40]Scribbled out the truth with their lies
[00:26.50]You little spies
[00:28.80]They taped over your mouth
[00:30.50]Scribbled out the truth with their lies
[00:33.50]You little spies
[00:40.30]Crush
[00:41.90]Crush
[00:43.60]Crush
[00:44.50]Crush, crush
[00:45.40](Two, three, four!)
[00:46.00]Nothing compares to a quiet evening alone
[00:49.70]Just the one-two of us, who's counting on
[00:53.00]That never happens
[00:54.90]I guess I'm dreaming again
[00:56.80]Let's be more than this
[01:06.90]If you want to play it like a game
[01:10.20]Well, come on, come on, let's play
[01:13.80]Cause I'd rather waste my life pretending
[01:17.20]Than have to forget you for one whole minute
[01:21.00]They taped over your mouth
[01:23.00]Scribbled out the truth with their lies
[01:26.10]You little spies
[01:27.90]They taped over your mouth
[01:30.00]Scribbled out the truth with their lies
[01:33.10]You little spies
[01:39.90]Crush
[01:41.50]Crush
[01:43.40]Crush
[01:44.10]Crush, crush
[01:44.90](Two, three, four!)
[01:45.40]Nothing compares to a quiet evening alone
[01:49.20]Just the one-two of us, who's counting on
[01:52.60]That never happens
[01:54.50]I guess I'm dreaming again
[01:56.30]Let's be more than this now
[02:06.50]Rock and roll, baby
[02:08.40]Don't you know that we're all alone now?
[02:11.60]I need something to sing about
[02:13.50]Rock and roll, hey
[02:15.50]Don't you know, baby, we're all alone now?
[02:18.60]I need something to sing about
[02:20.40]Rock and roll, hey
[02:22.40]Don't you know, baby, we're all alone now?
[02:25.70]Give me something to sing about
[02:27.50]Nothing compares to a quiet evening alone
[02:31.20]Just the one-two of us, who's counting on
[02:34.60]That never happens
[02:36.40]I guess I'm dreaming again
[02:38.30]Let's be more than
[02:40.40]No, oh
[02:41.60]Nothing compares to a quiet evening alone
[02:45.20]Just the one-two of us, who's counting on
[02:48.60]That never happens
[02:50.50]I guess I'm dreaming again
[02:52.30]Let's be more than
[02:54.60]More than this
[02:58.80]Ohoh ohoh ohoh
[03:02.20]Oooh...
`;

const songName = "Crushcrushcrush";
const artistName = "Paramore";

const jsonResult = parseLRC(lrcContent, songName, artistName);
console.log(jsonResult);
