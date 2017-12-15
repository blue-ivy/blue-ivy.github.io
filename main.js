

function animatedScrollTo(element){
    $('html, body').animate({
        scrollTop: $(element).offset().top - 40
    }, 500);
}

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
})
