{
    "name": "POS Notes",
    "summary": """Allows the seller to add notes to individual orderlines as well as the complete order in POS.""",
    "category": "Point Of Sale",
    "version": "1.0.0",
    "sequence": 1,
    "depends": ['point_of_sale'],
    "data": [
        'views/res_config_setting.xml',
        'views/template.xml',
    ],
    "images": ['static/description/Banner.png'],
    "application": True,
    "installable": True,
    "assets": {
        'point_of_sale.assets': [
            "/pos_note/static/src/js/main.js",
            "/pos_note/static/src/js/AlertPopUp.js",
            "/pos_note/static/src/js/TextAreaPopUp.js",
            '/pos_note/static/src/xml/pos_note.xml',
        ],
    },
    "auto_install": False
}
