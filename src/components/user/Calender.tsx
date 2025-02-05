import { useState } from 'react';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './Calender.css';

interface CalendarProps {
    dateRange: {
        startDate: Date;
        endDate: Date;
    };
    onDateChange: (newDate: { startDate: Date; endDate: Date }) => void;
}

const Calender: React.FC<CalendarProps> = ({ dateRange, onDateChange }) => {
    const [openDate, setOpenDate] = useState(false);

    const handleChange = (ranges: RangeKeyDict) => {
        const { selection } = ranges;
        if (selection.startDate && selection.endDate) {
            onDateChange({ startDate: new Date(selection.startDate), endDate: new Date(selection.endDate) });
        }
    };

    const handleClick = () => {
        setOpenDate((prev) => !prev);
    };

    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className='container'>
            <span onClick={handleClick} className='calender text-gray-800'>
                Select Dates
            </span>
            {openDate && (
                <DateRangePicker
                    className='dateRange'
                    ranges={[{
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate,
                        key: 'selection'
                    }]}
                    onChange={handleChange}
                    minDate={new Date()}
                />
            )}
            <p className='text-sm text-gray-800 mt-10'>
                Dates: {formatDate(dateRange.startDate)} to {formatDate(dateRange.endDate)}
            </p>
        </div>
    );
};

export default Calender;