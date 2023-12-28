from odoo import fields, models


class PosConfig(models.Model):
    _inherit = 'pos.config'

    # Added configuration pos wise
    on_product_line = fields.Boolean(
        'Add notes to individual orderlines', default=True)
    on_order = fields.Boolean('Add note to the complete order', default=True)
    receipt_order_note = fields.Boolean(
        'Print notes on the receipt', default=True)
    note_keyword_limit = fields.Integer(string="Note Keywords Limit")
    set_note_keyword_limit = fields.Boolean()