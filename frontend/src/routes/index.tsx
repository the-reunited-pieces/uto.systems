import { Layout } from "@/components/Layout";
import { createRoot } from "react-dom/client";
import "../global.css";

const root = document.getElementById("root")!;

function Index() {
    return (
        <Layout>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget fringilla libero. Nulla magna massa, volutpat eget ipsum sit amet, dictum
                iaculis lacus. Praesent non commodo justo. Morbi vulputate sit amet velit posuere porttitor. Sed cursus urna lectus, sed vestibulum orci egestas
                id. Maecenas at tincidunt ante, nec viverra erat. Curabitur sit amet suscipit felis. Pellentesque tincidunt tortor augue, a pulvinar nulla
                pharetra id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse venenatis nulla justo, ut
                lobortis mi pellentesque eu. Ut est nunc, maximus vitae est eget, facilisis pellentesque nulla. Nunc quis massa in quam eleifend molestie.
                Nullam dictum nulla vel risus molestie pretium et a nulla. Proin condimentum bibendum vulputate. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos.
            </p>
            <p>
                Duis condimentum, lacus commodo cursus dignissim, metus tortor faucibus dui, ut imperdiet odio purus id leo. Nullam venenatis ac nunc vitae
                posuere. Nulla ornare at purus id pellentesque. Ut mollis venenatis magna, ac convallis dui pretium vel. Vestibulum porta mi eu turpis aliquet,
                in mattis lectus lacinia. Donec elit mauris, tristique vitae elementum at, pretium sed ante. Vestibulum pharetra pretium posuere. Suspendisse in
                lacus venenatis, viverra mi sed, malesuada risus. Mauris ac suscipit nibh. Phasellus tempor pretium leo sit amet ullamcorper. Curabitur placerat
                scelerisque efficitur. Nam dui eros, lacinia eget orci sit amet, rutrum suscipit diam. Nullam quis est mollis, bibendum nunc a, vulputate neque.
                Phasellus non turpis non nisl dapibus varius vitae eu felis. Quisque commodo felis nisl, in sollicitudin ante imperdiet nec. Phasellus
                condimentum nisl lectus.
            </p>
        </Layout>
    );
}

createRoot(root).render(<Index />);
