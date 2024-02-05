import { Box, Stack } from '@mui/material'
import {styles} from '../styles/Grid.style'

export default function Grid() {
    const {gridContainer, rowContainer, colContainer} = styles
    const rows = [1, 2, 3, 4, 5, 6]
    const cols = [1, 2, 3, 4, 5, 6, 7]
    return (
        <Box sx={gridContainer}>
            {rows.map((row) => {
                return (
                    <Stack sx={rowContainer} direction={'row'}>
                        {cols.map((col) => {
                            return (
                                <Box sx={colContainer}>
                                    X
                                </Box>
                            )
                        })}
                    </Stack>
                )
            })}
        </Box>
    )
}