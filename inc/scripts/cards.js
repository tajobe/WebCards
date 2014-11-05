var cards = {};

/**
 * load needed elements for expanding large cards
 */
function loadCards()
{
    makeCards(); // set up cards in page
    cardsWidth(); // make cards center
    checkHashCard(); // check if card was linked to directly
}

/**
 * Set up cards as they need to be for page
 */
function makeCards()
{
    var cardDivs = document.getElementsByClassName("card");
    for ( var i = 0; i < cardDivs.length; i++ )
    {
        var card = new Card(cardDivs[i], i); // make card
        cards[cardDivs[i].id] = card; // put card in map

        // set card to initial state
        card.contractCard();
        if ( hasClass(cardDivs[i], 'startExpanded') ) card.expandCard();
    }
}

/**
 * Check if element is a member of class clazz
 * 
 * @param element
 *            element to check for membership in class
 * @param clazz
 *            class to check for
 * @returns {Boolean} if element is a member of class clazz
 */
function hasClass( element , clazz )
{
    return (' ' + element.className + ' ').indexOf(' ' + clazz + ' ') > -1;
}

/**
 * Set width of cards element so page centers correctly
 */
function cardsWidth()
{
    // set width so page centers
    var cols = document.getElementsByClassName("gNow");
    var width = 0;
    for ( var i = 0; i < cols.length; i++ )
    {
        width += cols[i].offsetWidth;
    }
    document.getElementById("cards").style.width = width + 'px';
}

/**
 * If we are linked to a card with #, expand that card
 */
function checkHashCard()
{
    var hashLoc = window.location.hash;

    // if there's a hash, attempt to expand a card with that name
    if ( hashLoc )
    {
        var cardId = hashLoc.substring(1);
        var card = cards[cardId];

        // if we found the card, expand it
        if ( card )
        {
            card.expandCard();

            setTimeout(function()
            {
                document.getElementById(cardId).scrollIntoView();
            }, 500);
        }
    }
}

/**
 * Find y position of element
 * 
 * @param el
 *            element to get y pos of
 * @return y pos of element
 */
function findY( el )
{
    var curTop = 0;
    if ( el.offsetParent )
    {
        do
        {
            curTop += el.offsetTop;
        }
        while ( el = el.offsetParent );
    }
    return curTop;
}