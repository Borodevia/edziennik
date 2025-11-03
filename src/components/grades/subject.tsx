'use client';

import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';

import type { SubjectGrades } from '@/app/dashboard/grades/page';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState, type ReactElement } from 'react';
import { Card } from '../ui/card';

type SubjectProps = {
  item: SubjectGrades;
};

function Subject({ item }: SubjectProps): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Card className="mb-4 p-4 w-full">
          <div className="font-semibold mb-2">{item.subject}</div>

          {isOpen ?
            <Table className="overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>Ocena</TableHead>
                  <TableHead>Kategoria</TableHead>
                  <TableHead>Opis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {item.grades.map((grade, gidx) => (
                  <TableRow key={gidx}>
                    <TableCell>{grade.value}</TableCell>
                    <TableCell>{grade.category}</TableCell>
                    <TableCell>{grade.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          : <ul className="list-none flex gap-2.5">
              {item.grades.map((grade, gidx) => (
                <li key={gidx} className="">
                  <Badge
                    variant="outline"
                    className="font-semibold text-sm p-3 aspect-square rounded-lg hover:bg-gray-50"
                  >
                    {grade.value}
                  </Badge>
                </li>
              ))}
            </ul>
          }
        </Card>
      </CollapsibleTrigger>
    </Collapsible>
  );
}

export default Subject;
