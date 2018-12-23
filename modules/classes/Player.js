const Config = require('../utils/Config');
const Entity = require('./Entity');
const TypeOperators = require('../utils/TypeOperators');

/**
 * Represents a Player.
 */
class Player extends Entity {

    constructor(timeOfCreation) {
        super();
        this.discordId = -1;
        this.level = 1;
        this.experience = 0;
        this.money = 0;
        this.effect = ":baby:";
        this.lastReport = timeOfCreation;
    }

    constructor(maxHealth,health,attack,defense,speed,discordId,level,experience,money,effect,lastReport) {
        super(maxHealth,health,attack,defense,speed);
        this.discordId = discordId;
        this.level = level;
        this.experience = experience;
        this.money = money;
        this.effect = effect;
        this.lastReport = lastReport;
    }


    /**
     * Returns the amount of experience needed to level up. The formula for the amount of experience is:
     * f(level) = 75 * level ^ 1.35, where 75 and 1.35 are constants defined in NumberConstants.js.
     * @see NumberConstants
     * @returns {number} Returns the experience needed to level up.
     */
    getExperienceToLevelUp() {
        return Math.round(Config.PLAYER_BASE_EXPERIENCE_PER_LEVEL *
                          Math.pow(this.level, Config.PLAYER_BASE_EXPERIENCE_RATIO));
    }

    /**
     * Add the specified amount of experience to the player's experience total. If it allows the Player to
     * level up, the levelUp function will be called.
     * @see levelUp
     * @param experience - The amount of experience to add. Must be a positive Number.
     */
    addExperience(experience) {
        if (TypeOperators.isAPositiveNumber(experience)) {
            this.setExperience(this.experience + experience);
            if (this.hasEnoughExperienceToLevelUp()) {
                this.levelUp();
            }
        }
    }

    /**
     * Returns this Player instance's current experience.
     * @returns {number} - The amount of experience this Player instance currently has.
     */
    getExperience() {
        return this.experience;
    }

    /**
     * Set this Player instance's current experience.
     * @param experience - The amount of experience this instance should have. Must be a positive or null Number.
     */
    setExperience(experience) {
        if (TypeOperators.isAPositiveNumberOrNull(experience)) {
            this.experience = experience;
            if (this.hasEnoughExperienceToLevelUp()) {
                this.levelUp();
            }
        }
    }

    /**
     * Returns this Player instance's current experience.
     * @returns {number} - The level of this Player instance.
     */
    getLevel() {
        return this.level;
    }

    /**
     * Set this Player instance's level.
     * @param level - The level this Player instance should be. Must be a positive Number.
     */
    setLevel(level) {
        if (TypeOperators.isAPositiveNumber(level)) {
            this.level = level;
        }
    }

    /**
     * Increments the Player's level, and subtract the experience needed for the level up from the Player's
     * experience.
     */
    levelUp() {
        this.setExperience(this.getExperience() - this.getExperienceToLevelUp());
        this.setLevel(this.getLevel() + 1);
    }

    /**
     * Add the specified amount of money to the Player's wallet.
     * Note: If money is negative, then removeMoney is called.
     * @see removeMoney
     * @param money - The amount of money to add. Must be a Number.
     */
    addMoney(money) {
        if (TypeOperators.isANumber(money)) {
            if (money > 0) {
                this.money += money;
            } else {
                this.removeMoney(-money);
            }
        }
    }

    /**
     * Removes the specified amount of money from the Player's wallet.
     * Note: If money is negative, then addMoney is called.
     * @see addMoney
     * @param money - The amount of money to remove. Must be a Number.
     */
    removeMoney(money) {
        if (TypeOperators.isANumber(money)) {
            if (money > 0) {
                this.money -= money;
            } else {
                this.addMoney(-money);
            }
        }
    }

    /**
     * Set this Player instance's currently held amount of money.
     * @param money - The amount of money this Player instance should have. Must be a positive or null Number.
     */
    setMoney(money) {
        if (TypeOperators.isAPositiveNumberOrNull(money)) {
            this.money = money;
        }
    }

    /**
     * Returns this Player instance's currently held money.
     * @returns {number} - The amount of money held by this Player instance.
     */
    getMoney() {
        return this.money;
    }

    /**
     * Returns whether the Player has enough experience to level up or not.
     * @returns {boolean} True if the player has the needed amount of experience to level up, false otherwise.
     */
    hasEnoughExperienceToLevelUp() {
        return (this.experience >= this.getExperienceToLevelUp());
    }

    /**
     * Move the player to the specified place.
     * @see Places
     * @param place - The player to move the player to. Must exist within Places.
     */
    moveToPlace(place) {
        if (this.getPlace() !== place && place in Places) {
            this.place = place;
        }
    }

    /**
     * Returns the Player instance's whereabouts.
     * @returns {string|*} - Where the Player currently is located.
     */
    getPlace() {
        return this.place;
    }

    /**
     * Changes the name of the Player.
     * @param name - The Player's new name.
     */
    setName(name) {
        if (TypeOperators.isAString(name)) {
            this.name = name;
        }
    }

    /**
     * Returns this Player instance's name.
     * @returns {string} - The name of this Player instance.
     */
    getName() {
        return this.name;
    }

    /**
     * Changes the Player's Discord ID. Should be called once by instance lifetime in practice.
     * @param discordId - The Discord User ID to assign to the player.
     */
    setDiscordId(discordId) {
        if (TypeOperators.isANegativeNumber(this.discordId)) {
            this.discordId = discordId;
        }
    }

    /**
     * Returns the Discord User ID associated to this Player instance.
     * @returns {number|*} - The Discord User ID associated to this Player instance.
     */
    getDiscordId() {
        return this.discordId;
    }
}

module.exports = Player;