import { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isDateInRange } from '../../utils/Helpers';
import { allAmenities, rooms } from '../../utils/Data';
import { DatePickerInput } from "@mantine/dates";
import { Select, Checkbox, RangeSlider } from "@mantine/core";
import Card from '../../components/ui/Card';

const Rooms = () => {
    const { bookedRooms } = useSelector((state) => state.main);
    const bookedIds = bookedRooms.map((r) => r.roomId);
    const availableRooms = rooms.filter((r) => !bookedIds.includes(r.id));

    const [dateRange, setDateRange] = useState([null, null]);
    const [roomType, setRoomType] = useState("All");
    const [sortBy, setSortBy] = useState("All");
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [priceRange, setPriceRange] = useState([1, 1000]); // ✅ added
    const [currentPage, setCurrentPage] = useState(1);

    // ✅ main filtering logic
    const filteredRooms = useMemo(() => {
        let filtered = [...availableRooms];
        const [start, end] = dateRange;
        const [minPrice, maxPrice] = priceRange;

        if (roomType !== 'All') {
            filtered = filtered.filter((r) => r.type === roomType);
        }

        if (selectedAmenities.length > 0) {
            filtered = filtered.filter((r) =>
                selectedAmenities.every((a) => r.amenities.includes(a))
            );
        }

        if (start && end) {
            filtered = filtered.filter((room) => {
                if (!room.bookedDates || room.bookedDates.length === 0) return false;

                return room.bookedDates.some(({ checkIn, checkOut }) =>
                    isDateInRange(start, end, checkIn, checkOut)
                );
            });
        }

        // ✅ price range filter
        filtered = filtered.filter(
            (r) => r.pricePerNight >= minPrice && r.pricePerNight <= maxPrice
        );

        if (sortBy === "high")
            filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
        else if (sortBy === "low")
            filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);

        return filtered;
    }, [roomType, sortBy, selectedAmenities, dateRange, priceRange, availableRooms]);

    // reset pagination on filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [roomType, sortBy, selectedAmenities, dateRange, priceRange]);

    const paginatedRooms = useMemo(() => {
        return filteredRooms.slice(0, currentPage * 8);
    }, [filteredRooms, currentPage]);

    const hasMore = paginatedRooms.length < filteredRooms.length;

    const handleLoadMore = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handleClearFilter = () => {
        setDateRange([null, null]);
        setRoomType("All");
        setSortBy("All");
        setSelectedAmenities([]);
        setPriceRange([1, 1000]);
    }
    return (
        <section className="flex lg:flex-row flex-col gap-4 w-[90%] mx-auto py-30">

            <div className="flex flex-col gap-4 lg:max-w-[350px] lg:w-[90%]">
                <h3 className="text-3xl font-bold text-black">Filters</h3>
                <div className="flex flex-col sticky top-20 gap-4 mb-8 p-4 rounded-4xl border border-zinc-200">
                    <DatePickerInput
                        type="range"
                        label="Select Date Range"
                        placeholder="Pick check-in & check-out"
                        value={dateRange}
                        onChange={setDateRange}
                    />

                    <Select
                        label="Room Type"
                        placeholder="All"
                        data={["All", "Single Room", "Double Room", "Suite"]}
                        value={roomType}
                        onChange={setRoomType}
                    />

                    <Select
                        label="Sort by"
                        placeholder="Default"
                        data={[
                            { value: "All", label: "All" },
                            { value: "low", label: "Price: Low to High" },
                            { value: "high", label: "Price: High to Low" },
                        ]}
                        value={sortBy}
                        onChange={setSortBy}
                    />

                 
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-bold">Price Range</p>
                        <RangeSlider
                            color="dark"
                            min={1}
                            max={1000}
                            step={10}
                            value={priceRange}
                            onChange={setPriceRange}
                            label={(value) => `$${value}`}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                    </div>


                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-bold">Amenities</p>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {allAmenities.map((amenity) => (
                                <Checkbox
                                    key={amenity}
                                    label={amenity}
                                    checked={selectedAmenities.includes(amenity)}
                                    onChange={(e) => {
                                        if (e.currentTarget.checked)
                                            setSelectedAmenities((prev) => [...prev, amenity]);
                                        else
                                            setSelectedAmenities((prev) =>
                                                prev.filter((a) => a !== amenity)
                                            );
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleClearFilter}
                        className="w-full mt-2 px-4 py-2 text-sm! border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>

            {/* Rooms List */}
            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-black">Rooms</h3>
                    <p className="text-sm text-gray-600">
                        Showing {paginatedRooms.length} of {filteredRooms.length} rooms
                    </p>
                </div>

                {filteredRooms.length > 0 ? (
                    <>
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                            {paginatedRooms.map((item, index) => (
                                <Card key={item.id} item={item} index={index} />
                            ))}
                        </div>

                        {hasMore && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleLoadMore}
                                    className="px-8 py-3 border border-black rounded-full bg-black text-white hover:bg-white hover:text-black transition cursor-pointer"
                                >
                                    See More
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-zinc-500 flex items-center justify-center min-h-[300px]">
                        No rooms available
                    </p>
                )}
            </div>
        </section>
    );
};

export default Rooms;
