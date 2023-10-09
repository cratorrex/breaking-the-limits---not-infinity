//Use this to clear bulk overflows or tooltips
export class Texts{

    




    




    




    versionGame(display){
        let changelog001 = //function VersionLog(versionID, changelog)
"<hr/><div class=\"changelog\"><p><strong>Version 0.0.1</strong> Testing the Limits.</p>" +
"<p>Created the page structure, and created the most simple of gameplay " + 
"loops.</p>" +
"<p>Click the button when Point = Limit to gain 1 Limit.</p><br/>" +
"<p>Credits to <b>rak.exe</b> for the support and help in building " +
"the initial code that this project began with.</p><br/>" +
"<p>Tried setInterval instead of requestAnimationFrame.</p></div><hr/>";

        let changelog002 = 
"<hr/><div class=\"changelog\"><p><strong>Version 0.0.2</strong> Structures.</p>" +
"<p>Added Structures.</p> <p>Added framework for the Upgrades Panel.</p>"+
"<p>This update seems rushed, but next update is Upgrades!</p></div><hr/>";



display.html(changelog002 + changelog001);

    }
}