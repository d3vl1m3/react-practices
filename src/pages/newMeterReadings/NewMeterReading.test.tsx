
import {  act, fireEvent, render, screen, within} from '@testing-library/react';
import { NewMeterReading } from './NewMeterReading';
import { routes } from '../../utils/routes';

describe('NewMeterReading', () => {
    describe('when the form renders', () => {
        beforeEach(() => {
            render(
                <NewMeterReading 
                    accountId={''} 
                    error={null} 
                    isLoading={false} 
                    createMeterReading={jest.fn()} 
                    navigateOnSuccess={jest.fn()} 
                />
            );
        })

        it('should render the form', () => {
            expect(screen.getByRole('form')).toBeInTheDocument();
        })

        it('should render the reading value input inside of the form', () => {
            const form = screen.getByRole('form');
            expect(within(form).getByRole('textbox', {name: 'Reading:'})).toBeInTheDocument();
        })

        it('should render the reading date input inside of the form', () => {
            const form = screen.getByRole('form');
            expect(within(form).getByLabelText('Read Date:')).toBeInTheDocument();
        })
        it('should render the reading type radio buttons inside of the form', () => {
            const form = screen.getByRole('form');
            const radioGroup = within(form).getByRole('radiogroup', {name: 'Reading Type:'});
            
            expect(within(radioGroup).getByRole('radio', {name: 'Gas'})).toBeInTheDocument();
            expect(within(radioGroup).getByRole('radio', {name: 'Electric'})).toBeInTheDocument();
        })        
    })

    describe('when the form is submitted with valid values', () => {
        const mockCreateMeterReading = jest.fn().mockResolvedValue({accountId: '1'});
        const mockNavigateOnSuccess = jest.fn();

        beforeEach(async () => {
            render(
                <NewMeterReading 
                    accountId={'1234'} 
                    error={null} 
                    isLoading={false} 
                    createMeterReading={mockCreateMeterReading} 
                    navigateOnSuccess={mockNavigateOnSuccess} 
                />
            );

            const readingValue = screen.getByRole('textbox', {name: 'Reading:'});
            const readingDate = screen.getByLabelText('Read Date:');
            const readingType = screen.getByRole('radio', {name: 'Gas'});

            fireEvent.change(readingValue, {target: {value: '12345'}});
            fireEvent.change(readingDate, {target: {value: '2021-01-01'}});
            fireEvent.click(readingType);

            const submitButton = screen.getByRole('button', {name: 'Submit'});

            await act(async () => {
                fireEvent.click(submitButton);
            });
            
        })

        it('should call createMeterReading with the correct values', () => {
            expect(mockCreateMeterReading).toHaveBeenCalledWith({
                readingValue: '12345',
                meterReadingDate: '2021-01-01',
                meterReadingType: 'gas'
            })

        })

        it('should call navigateOnSuccess with the accountId', () => {
            expect(mockNavigateOnSuccess).toHaveBeenCalledWith(
                routes.site.meterReadings('1234')
            )
        })
    })

    describe('when the form is submitted with invalid values', () => {
        const mockCreateMeterReading = jest.fn().mockResolvedValue({accountId: '1'});
        const mockNavigateOnSuccess = jest.fn();

        beforeEach(async () => {
            render(
                <NewMeterReading 
                    accountId={'1234'} 
                    error={null} 
                    isLoading={false} 
                    createMeterReading={mockCreateMeterReading} 
                    navigateOnSuccess={mockNavigateOnSuccess} 
                />
            );

            const readingValue = screen.getByRole('textbox', {name: 'Reading:'});
            const readingDate = screen.getByLabelText('Read Date:');
            const readingType = screen.getByRole('radio', {name: 'Gas'});

            fireEvent.change(readingValue, {target: {value: '1234'}});
            fireEvent.change(readingDate, {target: {value: '2021/01/01'}})
            fireEvent.click(readingType);

            const submitButton = screen.getByRole('button', {name: 'Submit'});

            await act(async () => {
                fireEvent.click(submitButton);
            });
            
        })

        it('should display the reading value error message', () => {
            expect(screen.getByText('Reading must be a 5 digit number')).toBeInTheDocument();
        })

        it('should display the reading date error message', () => {
            expect(screen.getByText('Date must be in the format DD-MM-YYYY')).toBeInTheDocument();
        })
    })
})