import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

const ExamTable = ({ session, exams }) => {
    
  const navigate = useNavigate();
  
  // Generate dates between start and end date
  const getDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    
    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  // Get time slots from session
  const timeSlots = [
    { start: session.debutMatin1, end: session.finMatin1 },
    { start: session.debutMatin2, end: session.finMatin2 },
    { start: session.debutSoir1, end: session.finSoir1 },
    { start: session.debutSoir2, end: session.finSoir2 }
  ].filter(slot => slot.start && slot.end);

  const dates = getDates(session.startDate, session.endDate);

  const handleCellClick = (date, timeSlot) => {
    // Find exam for this slot if it exists
    const exam = exams.find(e => 
      e.date === date && 
      e.startTime === timeSlot.start && 
      e.endTime === timeSlot.end
    );

    if (exam) {
      navigate(`/exam/${exam.id}`);
    } else {
      navigate('/add-exam', {
        state: {
          date,
          startTime: timeSlot.start,
          endTime: timeSlot.end,
          sessionId: session.session_id
        }
      });
    }
  };

  return (
    <Card className="w-full overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">Jours</TableCell>
            {timeSlots.map((slot, index) => (
              <TableCell key={index} className="font-bold text-center">
                {`${slot.start} - ${slot.end}`}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dates.map((date, dateIndex) => (
            <TableRow key={dateIndex}>
              <TableCell className="font-medium">
                {date.toLocaleDateString()}
              </TableCell>
              {timeSlots.map((slot, slotIndex) => {
                const exam = exams.find(e => 
                  e.date === date.toISOString().split('T')[0] &&
                  e.startTime === slot.start &&
                  e.endTime === slot.end
                );
                
                return (
                  <TableCell 
                    key={slotIndex}
                    className={`text-center cursor-pointer hover:bg-gray-100 ${
                      exam ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleCellClick(date.toISOString().split('T')[0], slot)}
                  >
                    {exam ? exam.module.name : ''}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ExamTable;