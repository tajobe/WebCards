var maxHeight = 200; // max height of a card

/**
 * A Card that can be expanded or contracted to either show beyond maxHeight or
 * switch to more expansive content
 * 
 * @param cardElem
 *            card's element
 * @param cardId
 *            unique ID of card(index?)
 */
function Card( cardElem , cardId )
{
    // our element
    this.el = cardElem;

    // unique card ID
    this.cardId = cardId;

    // wrap content of card in an inner card so we can get height of it
    // without border/padding
    var innerCardId = 'innercard' + cardId;
    this.el.innerHTML = '<div class="innercard" id="' + innerCardId + '">'
            + this.el.innerHTML + '</div>';

    // fetch new inner card div
    this.innerCard = document.getElementById(innerCardId);

    // find height of card contracted
    this.contractedHeight = this.innerCard.offsetHeight < maxHeight ? this.innerCard.offsetHeight + 10
            : maxHeight;

    // content elements shown for expanded card
    this.expandedElems = this.innerCard.getElementsByClassName("expanded");

    // content elements shown for contracted cards
    this.contractedElems = this.innerCard.getElementsByClassName("contracted");

    // set if this card needs to be an expanding card
    this.expandingCard = this.expandedElems.length > 0
            || this.innerCard.clientHeight > maxHeight;

    // add expand toggle button/text if we are an expanding card
    if ( this.expandingCard )
    {
        var helptext = 'This is an expandable card. There is a button near the bottom that shows when you mouse over it to expand and contract the card. It looks like 3 dots: &quot;...&quot;';
        this.innerCard.innerHTML += '<span class="expand" id="expand'
                + this.cardId + '">...</span>'
                + '<img src="inc/images/info.png" class="info" alt="Info"'
                + 'onclick="alert(&#39;' + helptext + '&#39;)" title="' + helptext
                + '" />';
        this.expandToggle = document.getElementById('expand' + this.cardId);
        this.expandToggle.onclick = function( card )
        {
            return function()
            {
                card.toggleCard();
            };
        }(this);
    }

    // current expanded state is false
    this.expanded = false;

    /**
     * Toggle card's current expanded status if we are an expanding card
     */
    this.toggleCard = function()
    {
        if ( this.expanded )
        {
            this.contractCard(); // contract expanded card
        }
        else
        {
            this.expandCard(); // expand contracted card
        }
    };

    /**
     * Expand card to full size and content
     */
    this.expandCard = function()
    {
        // only do expanding action if we are an expanding card
        if ( this.expandingCard )
        {
            // set expanded status
            this.expanded = true;

            // toggle card content to show expanded content if needed
            this.toggleDisplayed(this.expandedElems, this.contractedElems);

            // remove fade
            this.innerCard.removeChild(document.getElementById('fade'
                    + this.cardId));

            // expanded height should make room for expand/collapse button
            var newHeight = this.innerCard.scrollHeight
                    + (document.getElementById('expand' + this.cardId).clientHeight / 2);

            // expand card to full height
            this.el.style.height = newHeight + 'px';
        }
    };

    /**
     * Contract card to default size and content
     */
    this.contractCard = function()
    {
        // only do expanding action if we are an expanding card
        if ( this.expandingCard )
        {
            // set expanded status
            this.expanded = false;

            // toggle card content to show expanded content if needed
            this.toggleDisplayed(this.contractedElems, this.expandedElems);

            // remove expand
            this.innerCard.removeChild(this.expandToggle);

            // add fade div
            this.innerCard.innerHTML += '<div class="fade" id="fade'
                    + this.cardId + '" ></div>';

            // re-add expand so it is on top
            this.innerCard.appendChild(this.expandToggle);

            // set max height
            this.el.style.height = this.contractedHeight + 'px';
        }
    };

    /**
     * Toggle what is displayed in the card
     * 
     * @param display
     *            elements to display
     * @param hide
     *            elements to hide
     */
    this.toggleDisplayed = function( display , hide )
    {
        // hide what is meant to be hidden
        for ( var i = 0; i < hide.length; i++ )
        {
            hide[i].style.display = 'none';
        }

        // display what is meant to be displayed
        for ( var i = 0; i < display.length; i++ )
        {
            display[i].style.display = 'block';

            // transition into view
            display[i].style.opacity = 0;
            window.getComputedStyle(display[i]).opacity;
            display[i].style.opacity = 1;
        }
    };

    /**
     * Gets card element
     * 
     * @return card element
     */
    this.getElement = function()
    {
        return this.el;
    };
}