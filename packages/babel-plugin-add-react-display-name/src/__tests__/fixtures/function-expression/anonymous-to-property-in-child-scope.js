// nested in child scope as an assignment
/* eslint-disable */
const initialize = () => {
    window.Foo = function () {
        return <div />;
    };
};
