# -*- coding: utf-8 -*-
import json
import math
import logging
import datetime
from itertools import chain

from odoo import http, _
from odoo.http import request

_logger = logging.getLogger(__name__)



class OdooAPI(http.Controller):
    @http.route(
        '/api/<string:model>', 
        auth='public', methods=['GET'], csrf=False, cors='*')
    def get_model_data(self, model, **params):
        itemsObjects = request.env[model.replace('-', '.')].sudo().search([])
        items = []
        for item in itemsObjects:
            items.append({
                'id': item.id,
                'name': item.name
            })
        return http.Response(
            json.dumps(items),
            status=200,
            mimetype='application/json'
        )
