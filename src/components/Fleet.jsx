import { trucks } from '../data/mockData';

function TruckCard({ truck }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="h-40 sm:h-48 bg-gray-100 overflow-hidden">
        <img
          src={truck.image}
          alt={truck.truckType}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-primary mb-3">{truck.truckType}</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Capacity</span>
            <span className="font-medium text-gray-700">{truck.capacity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Wheels</span>
            <span className="font-medium text-gray-700">{truck.wheels}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Coverage</span>
            <span className="font-medium text-accent">{truck.coverage}</span>
          </div>
        </div>
        <a
          href="#booking"
          className="mt-4 block text-center text-sm font-semibold text-accent border border-accent rounded-lg py-2 hover:bg-accent hover:text-white transition-colors"
        >
          Book This Truck
        </a>
      </div>
    </div>
  );
}

export default function Fleet() {
  return (
    <section id="fleet" className="py-12 sm:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-semibold text-sm tracking-wider uppercase mb-2">
            Our Fleet
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">Available Trucks</h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Choose from our wide range of verified trucks suited for every load type
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trucks.map((truck) => (
            <TruckCard key={truck.id} truck={truck} />
          ))}
        </div>
      </div>
    </section>
  );
}
