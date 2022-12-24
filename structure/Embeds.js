function formatColor(color) {
    if (color.startsWith('#'))
        return parseInt(color.split('#')[1], 16);
    if (color === 'RANDOM')
        return Math.floor(Math.random() * (0xffffff + 1));
    return Number(color);
}
module.exports = class {
    /**
     * Basic class for Discord Embeds
     */
    constructor() {
        this.title = undefined;
        this.description = undefined;
        this.url = undefined;
        this.timestamp = undefined;
        this.color = undefined;
        this.footer = undefined;
        this.image = undefined;
        this.thumbnail = undefined;
        this.video = undefined;
        this.provider = undefined;
        this.author = undefined;
        this.fields = undefined;
    }
    /**
     * Set up an author for your discord Embed
     * @param {string} author 
     * @param {string} image 
     * @param {string} url 
     */
    setAuthor(author, image, url) {
        if (!author || typeof author !== 'string')
            throw new SyntaxError('[DISCORD-EMBED] No author provided');
        this.author = {};
        this.author.name = author;
        this.author.url = url 
        this.author.icon_url = image && typeof image === 'string' && (0, Utils_1._testURL)(image) ? image : undefined;
        return this;
    }
    /**
     * Set up the title of your Discord Embed
     * @param {string} title 
     */
    setTitle(title) {
        if (!title || typeof title !== 'string')
            throw new SyntaxError('[DISCORD-EMBED] No title provided');
        this.title = title;
        return this;
    }
    /**
     * Setup the URL of your Discord Embed
     * @param {string} url 
     * @returns 
     */
    setURL(url) {
        if (!url )
            throw new SyntaxError('[DISCORD-EMBED] No url provided');
        this.url = url;
        return this;
    }
    setThumbnail(thumbnail) {
        this.thumbnail = {};
        this.thumbnail.url = thumbnail && (0, Utils_1._testURL)(thumbnail) ? thumbnail : undefined;
        return this;
    }
    setImage(image) {
        if (!image || !(0, Utils_1._testURL)(image))
            throw new SyntaxError('[DISCORD-EMBED] No image url provided');
        this.image = {};
        this.image.url = image;
        return this;
    }
    setTimestamp(date) {
        if (date) {
            this.timestamp = date;
        }
        else {
            this.timestamp = new Date();
        }
        return this;
    }
    setColor(color) {
        if (!color || typeof color !== 'string')
            throw new SyntaxError('[DISCORD-EMBED] No color provided');
        this.color = formatColor(color);
        return this;
    }
}