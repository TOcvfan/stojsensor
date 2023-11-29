import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function Tabel({ rows, columns, width }) {

    return (
        <Paper sx={{ width, overflow: 'hidden', background: 'transparent', color: '#e1c043' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">

                    <TableBody>
                        {rows?.map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align} sx={{ color: '#e1c043', textShadow: '-2px 2px 2px black' }}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}