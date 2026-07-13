from services.route_service import RouteService

result = RouteService.calculate_route(
    [77.5946, 12.9716],   # Bangalore
    [76.6394, 12.2958],   # Mysore
)

print(result)