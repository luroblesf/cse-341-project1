const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
    return [
        body("firstName")
            .notEmpty()
            .withMessage("First name is required"),

        body("lastName")
            .notEmpty()
            .withMessage("Last name is required"),

        body("email")
            .isEmail()
            .withMessage("Invalid email"),

        body("favoriteColor")
            .notEmpty()
            .withMessage("Favorite color is required"),

        body("birthday")
            .isISO8601()
            .withMessage("Birthday must be a valid date"),
        
        body("phone")
            .notEmpty()
            .withMessage("Phone number is required"),
        
        body("groupId")
            .notEmpty()
            .withMessage("Group ID is required")
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
};

const groupValidationRules = () => {
    return [
        body("name")
            .notEmpty()
            .withMessage("Group name is required"),

        body("description")
            .notEmpty()
            .withMessage("Description is required"),

        body("meetingPlace")
            .notEmpty()
            .withMessage("Meeting place is required"),

        body("isActive")
            .isBoolean()
            .withMessage("isActive must be true or false")
    ];
};

module.exports = {
    userValidationRules,
    groupValidationRules,
    validate
};