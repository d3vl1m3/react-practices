import { render, screen } from '@testing-library/react';
import { MeterReadings } from './MeterReadings';
import { MeterReading } from '../../apiAgents/meterReadings/types';


const mockMeterReading: MeterReading = {
    meterReadingId: 0,
    meterReadingDate: '',
    meterReadingType: '',
    readingValue: '',
    createdDateTime: ''
};

describe('MeterReadings', () => {
    describe('when the data is laoding', () => {
        beforeEach(() => {
            render(<MeterReadings isLoading={true} />);
        })
        it('should show a loading message', () => {
            expect(screen.getByRole('alert')).toHaveTextContent('Loading...');
        });
    })

    describe('when there are no meter readings', () => {
        beforeEach(() => {
            render(<MeterReadings meterReadings={[]} isLoading={false} />);
        })
        it('should show a no meter readings message', () => {
            expect(screen.getByRole('alert')).toHaveTextContent('No meter readings found');
        });
    })

    describe('when meter readings are present and loaded', () => {
        const mockMeterReadings: MeterReading[] = [
            {
                ...mockMeterReading,
                meterReadingId: 1,
            },
            {
                ...mockMeterReading,
                meterReadingId: 2
            },
        ]

        beforeEach(() => {
            render(
                <MeterReadings
                    meterReadings={mockMeterReadings}
                    isLoading={false}
                />
            );
        })

        it('should render the expected table headers in the table head', () => {
            expect(screen.getAllByRole('columnheader')).toHaveLength(5);

            expect(screen.getByRole('columnheader', { name: 'Meter Reading ID' })).toBeInTheDocument();
            expect(screen.getByRole('columnheader', { name: 'Meter Reading Date' })).toBeInTheDocument();
            expect(screen.getByRole('columnheader', { name: 'Meter Reading Type' })).toBeInTheDocument();
            expect(screen.getByRole('columnheader', { name: 'Reading Value' })).toBeInTheDocument();
            expect(screen.getByRole('columnheader', { name: 'Submitted at' })).toBeInTheDocument();
        })

        it('should render the expected table rows in the table body', () => {
            // length of the table rows should be equal to the length of the meter readings + 1 for the table headers
            expect(screen.getAllByRole('row')).toHaveLength(mockMeterReadings.length + 1);
        });
    })
});