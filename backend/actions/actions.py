from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import requests
import json

class ActionConsultarDisponibilidad(Action):
    def name(self) -> Text:
        return "action_consultar_disponibilidad"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        servicio = tracker.get_slot("servicio")
        fecha = tracker.get_slot("fecha")
        lugar = tracker.get_slot("lugar")

        # Aquí se haría una consulta real a una API o base de datos
        # Simulamos respuesta
        if servicio and fecha:
            message = f"Para {servicio} en {fecha} hay disponibilidad."
        else:
            message = "No tengo suficiente información para consultar disponibilidad."

        dispatcher.utter_message(text=message)
        return []

class ActionConsultarCosto(Action):
    def name(self) -> Text:
        return "action_consultar_costo"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        servicio = tracker.get_slot("servicio")
        # Consulta de precios
        dispatcher.utter_message(text=f"El costo de {servicio} es de $50.")
        return []

class ActionRealizarReserva(Action):
    def name(self) -> Text:
        return "action_realizar_reserva"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Lógica para reservar
        dispatcher.utter_message(text="Reserva confirmada. ¡Gracias!")
        return []