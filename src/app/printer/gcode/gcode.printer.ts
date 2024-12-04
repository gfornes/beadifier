import { Printer } from '../printer';
import { Project } from '../../model/project/project.model';
import { PaletteEntry } from '../../model/palette/palette.model';
import { Color } from '../../model/color/color.model';

import * as _ from 'lodash';

export class GcodePrinter implements Printer {
    name(): string {
        return 'Gcode';
    }

    print(
        reducedColor: Uint8ClampedArray,
        usage: Map<string, number>,
        project: Project,
        filename: string
    ) {

        console.log("GcodePrinter", "print", "reduceColor", reducedColor, "usage", usage, "project", project, "filename", filename);


        // define all cells
        const height =
            project.boardConfiguration.nbBoardHeight *
            project.boardConfiguration.board.nbBeadPerRow;
        const width =
            project.boardConfiguration.nbBoardWidth *
            project.boardConfiguration.board.nbBeadPerRow;

        let beadCoordinates = [];

        for (let y = 0; y < height; y++) {

            console.log("GcodePrinter", "print", "y", y);

            let row = [];

            for (let x = 0; x < width; x++) {

                console.log("GcodePrinter", "print", "x", x);

                const color = new Color(
                    reducedColor[y * width * 4 + x * 4],
                    reducedColor[y * width * 4 + x * 4 + 1],
                    reducedColor[y * width * 4 + x * 4 + 2],
                    reducedColor[y * width * 4 + x * 4 + 3]
                );

                console.log("GcodePrinter", "print", "color", color);

                const paletteEntry: PaletteEntry = _.find(
                    _.flatten(
                        project.paletteConfiguration.palettes.map(
                            (p) => p.entries
                        )
                    ),
                    (entry) => {
                        return (
                            entry.color.r === color.r &&
                            entry.color.g === color.g &&
                            entry.color.b === color.b
                        );
                    }
                );

                // it checks the entire canvas but only where there are beads will it have a paletteEntry
                // so not on the margins for example
                if (paletteEntry) {
                    console.log("GcodePrinter", "print", "paletteEntry", paletteEntry);
                    row.push(paletteEntry);
                }



            } // end second for

            if (row.length > 0) {
                beadCoordinates.push(row);
            }

        } // end first for

        console.log("GcodePrinter", "print", "beadCoordinates", beadCoordinates);
    }
}
