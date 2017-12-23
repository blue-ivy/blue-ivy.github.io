

function animatedScrollTo(element){
    $('html, body').animate({
        scrollTop: $(element).offset().top - 40
    }, 500);
}

function pushPoem(str){
    $("#myShellId").html(str)
}

function buildAPoem() {
    // the python project has 3 parameters,
    // n = number of gram-sentences returned
    // m = the bi,tri, or n-gram length
    // and the file(s) it should build from
    // Here, I assume 1 returned sentence, tri-gram, and only my work on the site
    // (starting simple. Id like to add rigor and short brown leather chairs here as well)
    var me = "";
    $(".poem").each( function(i) {
        // we want all the <br>s
        me += this.innerHTML;
    });
    var tokens = me.replace( /\n/g, " " ).split(" ");
    for (i = 0; i < tokens.length; i++){
        tokens[i] = tokens[i].trim()
    }
    // trigrams
    var trigrams = [];
    for (i = 0; i < (tokens.length - 2); i++) {
        var temp = [];
        temp.push(tokens[i]);
        temp.push(tokens[i + 1]);
        temp.push(tokens[i + 2]);
        trigrams.push(temp);
    }
    // shuffle
    trigrams = shuffle(trigrams);
    // CONSTRUCT //
    // MARKOV!!! //
    var poem = trigrams[Math.floor(Math.random() * (trigrams.length - 1))]
    var building = 1
    while (building > 0){
        building++;
        // the way this works, we only need to
        // match the first 2 (trigram) strings,
        // then we take the last one and add it to our poem
        var prefix = [poem[poem.length - 2], poem[poem.length - 1]]
        // FUN CASE!
        if (prefix[0] == prefix[1] && prefix[0] === "<br>"){
            // double break, lets start fesh
            poem.concat(trigrams[Math.floor(Math.random() * (trigrams.length - 1))])
            console.log("concat!")
        } else {
            for (i = 0; i < trigrams.length; i++) {
                if (trigrams[i][0] == prefix[0] && trigrams[i][1] == prefix[1]){
                    var next = trigrams[i][2]
                    poem.push(next)
                    if (next === "." || (Math.random() > 0.7 && next === "<br>")){
                        building = 0
                    }
		    // remove the match
		    trigrams.splice(i,1)
                    i = trigrams.length;
                    console.log("added " + next)
                }
            }
        }
        console.log(poem);
    }
    // human readable
    var outputPoem = ""
    for (i = 0; i < poem.length; i++){
        outputPoem += poem[i] + " ";
    }
    return outputPoem;
}

// why is there no built-in function for this js?
//http://www.itsmycodeblog.com/shuffling-a-javascript-array/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


/*
        I wrote this in another life, see my other github, MichaelIV.
        import sys
        import re
        import json
        import random as rand


        def run(n, m, *argv):
            huge_list = []
            for f in argv:
                this_file = open(f)
                for ln in this_file:
                    # \n
                    ln = ln.strip()
                    if ln is not "":
                        # splits on words
                        words = re.split('([\w\'\-]+)', ln)
                        # delete spaces and empty strings
                        words = [w for w in words
                                 if (w is not " " and
                                     w is not "" and
                                     w is not '"')]
                        for w in words:
                            huge_list.append(w)

            tokens = make_ngram(huge_list, n)
            for i in range(m):
                out = ""
                for w in markov(tokens, n):
                    out += str(w) + " "
                print(out)


        def make_ngram(input_list, n):
            # amazing line, found, online > list(zip(*[input_list[i:] for i in range(n)]))
            # http://locallyoptimal.com/blog/2013/01/20/elegant-n-gram-generation-in-python/
            gram = list(zip(*[input_list[i:] for i in range(n)]))
            # add on a base frequency,on the list
            # start at 0 because we'll match ourselves in this alg
            gram = [list(i) for i in gram]

            # print(gram)
            # print(json.dumps(input_dict, indent=3))
            return gram


        def markov(tokens, n):
            # Start generating
            # tokens is an n-gram
            # we want this to be shuffled before start
            rand.shuffle(tokens)
            phrase = []
            # starting point is a word that followed a '.','?','!'
            punct = rand.randint(0, 3);
            start = "."
            if punct == 1:
                start = "?"
            if punct == 2:
                start = "!"
            # get first n-length phrase to start
            for gram in tokens:
                if gram[0] == start:
                    phrase = list(gram)[1:]
                    if "." in phrase or "?" in phrase or "!" in phrase:
                        return list(phrase)
                    break

            while True:
                # take the last n-1 words in the
                # phrase and match them to another
                # - on first run, takes whole phrase
                window = phrase[-(n - 1):]
                swap = window.copy()
                # this match limits the list to grams that
                # have the same first word that as our window
                for match in [gram for gram in tokens if gram[0] == window[0]]:
                    m = list(match)
                    if m[:-1] == window:
                        phrase.append(m[n - 1])
                        window = phrase[-(n - 1):]
                        rand.shuffle(tokens)
                    # If we've picked up a punctuation mark
                    # lets break here
                    if phrase[-1] is "?" or phrase[-1] is "!" or phrase[-1] is ".":
                        return list(phrase)
                if swap == window:
                    # we're stuck
                    # best course of action here is to redo
                    phrase = []
                    punct = rand.randint(0, 3);
                    start = "."
                    if punct == 1:
                        start = "?"
                    if punct == 2:
                        start = "!"
                    for gram in tokens:
                        if gram[0] == start:
                            phrase = list(gram)[1:]
                            if "." in phrase or "?" in phrase or "!" in phrase:
                                return list(phrase)
                            break


        if __name__ == "__main__":
            if len(sys.argv) >= 2:
                run(int(sys.argv[1]), int(sys.argv[2]), sys.argv[3])
            else:
                print("try: ngram.py [gram-size] [number of output sentences] [file.txt]")
*/






// main

$(document).ready(function(){
    /*
		<h1 id="solHeaderId" >Sol</h1>
		<h1 id="hexHeaderId" >Hex</h1>
		<h1 id="aboutHeaderId" >Me</h1>
    */
    $("#solHeaderId").on("click", function(){
        animatedScrollTo("#solDivId");
    });
    $("#hexHeaderId").on("click", function(){
        animatedScrollTo("#hexDivId");
    });
    $("#matchsticksHeaderId").on("click", function(){
        animatedScrollTo("#matchsticksDivId");
    });
    $("#dailyHeaderId").on("click", function(){
        animatedScrollTo("#dailyDivId");
    });
    $("#meHeaderId").on("click", function(){
        animatedScrollTo("#meDivId");
    });
    $("#solTopHeaderId").on("click", function(){
        animatedScrollTo("#titlesDivId");
    });
    $("#hexTopHeaderId").on("click", function(){
        animatedScrollTo("#titlesDivId");
    });
    $("#meTopHeaderId").on("click", function(){
        animatedScrollTo("#titlesDivId");
    });
   $("#matchsticksTopHeaderId").on("click", function(){
        animatedScrollTo("#titlesDivId");
    });
    $("#dailyTopHeaderId").on("click", function(){
        animatedScrollTo("#titlesDivId");
    });
    $("#meInputId").on("click", function(){
        pushPoem(buildAPoem());
    });
})
