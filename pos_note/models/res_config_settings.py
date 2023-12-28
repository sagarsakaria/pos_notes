from odoo import fields, models

class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    # Add the pos configuraion in general pos settings.
    pos_on_product_line = fields.Boolean(
        related='pos_config_id.on_product_line', readonly=False)
    pos_on_order = fields.Boolean(
        related='pos_config_id.on_order', readonly=False)
    pos_receipt_order_note = fields.Boolean(
        related='pos_config_id.receipt_order_note', readonly=False)
    pos_note_keyword_limit = fields.Integer(
        related='pos_config_id.note_keyword_limit', readonly=False)
    pos_set_note_keyword_limit = fields.Boolean(
        related='pos_config_id.set_note_keyword_limit', readonly=False)