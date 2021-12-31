import * as React from "react";
import type {ReactNode} from "react";
import {PureComponent} from "react";

export class App extends PureComponent {

    public override render(): ReactNode {
        return <span>Hello, world!</span>;
    }

}
