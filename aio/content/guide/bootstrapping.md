# Bootstrapping

# 启动过程

An NgModule class describes how the application parts fit together.
Every application has at least one NgModule, the _root_ module
that you [bootstrap](#main) to launch the application.
You can call it anything you want. The conventional name is `AppModule`.

Angular 模块类描述应用的部件是如何组合在一起的。
每个应用都至少有一个 Angular 模块，也就是*根*模块，用来[引导](#main)并运行应用。
你可以为它取任何名字。常规名字是`AppModule`。

The [setup](guide/setup) instructions produce a new project with the following minimal `AppModule`.
You'll evolve this module as your application grows.

[开发环境](guide/setup)讲解了如何使用下面这个最小的`AppModule`来创建一个新项目。
这个模块随着应用的成长而演变。


<code-example path="setup/src/app/app.module.ts" title="src/app/app.module.ts" linenums="false">
</code-example>



After the `import` statements, you come to a class adorned with the
**`@NgModule`** [_decorator_](guide/glossary#decorator '"Decorator" explained').

`import`语句之后，可以看到一个**`@NgModule`**[装饰器](guide/glossary#decorator '"Decorator" explained')修饰的类。

The `@NgModule` decorator identifies `AppModule` as an `NgModule` class.
`@NgModule` takes a _metadata_ object that tells Angular how to compile and launch the application.

`@NgModule`装饰器将`AppModule`标记为 Angular 模块类（也叫`NgModule`类）。
`@NgModule`接受一个_元数据_对象，告诉 Angular 如何编译和启动应用。

* **_imports_** &mdash; the `BrowserModule` that this and every application needs to run in a browser.

  **_imports_** &mdash; `BrowserModule`，这个和每个在浏览器中运行应用都需要它。

* **_declarations_** &mdash; the application's lone component, which is also ...

  **_declarations_** &mdash; 应用的唯一组件，它同时也是...

* **_bootstrap_** &mdash; the _root_ component that Angular creates and inserts into the `index.html` host web page.

  **_bootstrap_** &mdash; _根_组件，Angular 创建它并插入`index.html`宿主页面。

The [NgModules](guide/ngmodule) guide dives deeply into the details of NgModules.
All you need to know at the moment is a few basics about these three properties.

[Angular 模块 (NgModules)](guide/ngmodule) 指南深入讲解了 Angular 模块。
现在先初步了解这三个属性。


{@a imports}


### The _imports_ array

### `imports`数组

NgModules are a way to consolidate features that belong together into discrete units.
Many features of Angular itself are organized as NgModules.
HTTP services are in the `HttpModule`. The router is in the `RouterModule`.
Eventually you may create a feature module.

Angular 模块把特性合并成离散单元的一种方式。
Angular 自身的许多特性也是通过 Angular 模块组织的。
HTTP 服务在`HttpModule`里。路由器在`RouterModule`中。
最终，你可能也会创建特性模块。

Add a module to the `imports` array when the application requires its features.

当应用需要模块的特性时，将其添加到`imports`数组中。

_This_ application, like most applications, executes in a browser.
Every application that executes in a browser needs the `BrowserModule` from `@angular/platform-browser`.
So every such application includes the `BrowserModule` in its _root_ `AppModule`'s `imports` array.
Other guide and cookbook pages will tell you when you need to add additional modules to this array.

_这个_应用和大多数其他应用一样，在浏览器中运行。
每个浏览器中运行的应用都需要`@angular/platform-browser`里的`BrowserModule`。
所以每个这样的应用都在其_根_`AppModule`的`imports`数组中包含`BrowserModule`。
在需要添加额外模块到此数组时，其他指南和烹饪宝典页面会告诉你。


<div class="alert is-important">



**Only `NgModule` classes** go in the `imports` array. Do not put any other kind of class in `imports`.

`imports`数组中应该**只有`NgModule`类**。不要放置其它类型的类。


</div>



<div class="l-sub-section">



The `import` statements at the top of the file and the NgModule's `imports` array
are unrelated and have completely different jobs.

不要将 Angular 模块的`imports`数组与文件顶部的`import`语句弄混淆了。它们的功能不同。

The _JavaScript_ `import` statements give you access to symbols _exported_ by other files
so you can reference them within _this_ file.
You add `import` statements to almost every application file.
They have nothing to do with Angular and Angular knows nothing about them.

_JavaScript_ 的`import`声明允许你访问在其他文件中_导出_的符号，这样你可以在_当前_文件引用它们。
我们会往几乎所有类型的应用中加入`import`语句。
它们与 Angular 毫无关系，Angular 对它们也一无所知。

The _module's_ `imports` array appears _exclusively_ in the `@NgModule` metadata object.
It tells Angular about specific _other_ NgModules&mdash;all of them classes decorated
with `@NgModule`&mdash;that the application needs to function properly.

_模块_的`imports`数组是`@NgModule`元数据中*独有的*。它告诉 Angular 特定 Angular 模块的信息 &mdash; 用`@NgModule`装饰的类 &mdash; 应用需要它们来正常工作。

</div>



{@a declarations}


### The _declarations_ array

### *declarations* 数组

You tell Angular which components belong to the `AppModule` by listing it in the module's `declarations` array.
As you create more components, you'll add them to `declarations`.

通过将其列到`AppModule`模块的`declarations`数组中，可以告诉 Angular 哪个组件属于`AppModule`。
在创建更多组件的过程中，逐步将它们添加到`declarations`中。

You must declare _every_ component in an `NgModule` class.
If you use a component without declaring it, you'll see a clear error message in the browser console.

你必须在一个`NgModule`类声明*每一个*组件。
否则当你使用这些组件时就会在浏览器的控制台中看到一个明显的错误信息。

You'll learn to create two other kinds of classes &mdash;
[directives](guide/attribute-directives) and [pipes](guide/pipes) &mdash;
that you must also add to the `declarations` array.

你将会学习如何创建其他两种类 &mdash; [指令](guide/attribute-directives)和[管道](guide/pipes) &mdash;
它们也必须被添加到`declarations`数组。


<div class="alert is-important">



**Only _declarables_** &mdash; _components_, _directives_ and _pipes_ &mdash; belong in the `declarations` array.
Do not put any other kind of class in `declarations`; _not_ `NgModule` classes, _not_ service classes, _not_ model classes.

**只有*可以声明的** &mdash; _组件_、_指令_和_管道_ &mdash; 属于`declarations`数组。
不要将其他类型的类添加到`declarations`中，例如`NgModule`类, 服务类，模型类。


</div>



{@a bootstrap-array}


### The _bootstrap_ array

### _bootstrap_ 数组

You launch the application by [_bootstrapping_](#main) the root `AppModule`.
Among other things, the _bootstrapping_ process creates the component(s) listed in the `bootstrap` array
and inserts each one into the browser DOM.

通过[_引导_](#main)根`AppModule`来启动应用。
在启动过程中，其中一步是创建列在`bootstrap`数组的组件，
并将它们每一个都插入到浏览器的DOM中。

Each bootstrapped component is the base of its own tree of components.
Inserting a bootstrapped component usually triggers a cascade of component creations that fill out that tree.

每个被引导的组件都是它自己的组件树的根。
插入一个被引导的组件通常触发一系列组件的创建并形成组件树。

While you can put more than one component tree on a host web page, that's not typical.
Most applications have only one component tree and they bootstrap a single _root_ component.

虽然你可以将多个组件树插入到宿主页面，但并不普遍。
大多数应用只有一个组件树，它们引导单一_根_组件。

You can call the one _root_ component anything you want but most developers call it `AppComponent`.

你可以为这个_根_组件取任何名字，但是大多数程序员将其取名为`AppComponent`。

Which brings us to the _bootstrapping_ process itself.

下面让我们来看看*引导*过程本身。


{@a main}

## Bootstrap in _main.ts_

## 在*main.ts*中引导

There are many ways to bootstrap an application.
The variations depend upon how you want to compile the application and where you want to run it.

引导应用的方法很多。
它们取决于你想如何编译应用以及应用将在哪儿运行。

In the beginning, you will compile the application dynamically with the _Just-in-Time (JIT)_ compiler
and you'll run it in a browser. You can learn about other options later.

开始时，你将使用_即时 (JiT) _编译器动态编译应用。然后在浏览器中运行它。
稍后，你可以了解其他选项。

The recommended place to bootstrap a JIT-compiled browser application is in a separate file
in the `src` folder named `src/main.ts`

引导即时编译的浏览器应用的推荐地点是在`src`目录中一个名为`src/main.ts`的单独文件中。


<code-example path="setup/src/main.ts" title="src/main.ts" linenums="false">

</code-example>



This code creates a browser platform for dynamic (JIT) compilation and
bootstraps the `AppModule` described above.

上面的代码为动态 (JiT) 编译创建浏览器平台，并引导上面提到的`AppModule`。

The _bootstrapping_ process sets up the execution environment,
digs the _root_ `AppComponent` out of the module's `bootstrap` array,
creates an instance of the component and inserts it within the element tag identified by the component's `selector`.

引导过程搭建运行环境，从模块的`bootstrap`数组中提出_根_`AppComponent`， 创建该组件的实例，并将其插入到组件`selector`标识的元素标签中。

The `AppComponent` selector &mdash; here and in most documentation samples &mdash; is `my-app`
so Angular looks for a `<my-app>` tag in the `index.html` like this one ...

`AppComponent`选择器 &mdash; 在这里以及文档大部分例子中 &mdash; 是`my-app`，
所以 Angular 在`index.html`中查找像这样的`<my-app>`标签...

<code-example path="setup/src/index.html" region="my-app" title="setup/src/index.html" linenums="false">

</code-example>



... and displays the `AppComponent` there.

...然后在那儿显示`AppComponent`。

This file is very stable. Once you've set it up, you may never change it again.

该文件非常稳定。一旦配置好，你可能永远不会再修改它。


<l-main-section>

</l-main-section>



## More about NgModules

## 关于Angular模块的更多知识

Your initial app has only a single module, the _root_ module.
As your app grows, you'll consider subdividing it into multiple "feature" modules,
some of which can be loaded later ("lazy loaded") if and when the user chooses
to visit those features.

你最初的应用只有一个单一的模块 —— *根*模块。
当这个应用不断成长时，你就要考虑把它们拆分到多个 "特性" 模块中了。
这些特性模块中的一部分可以稍后加载（即惰性加载），它们只会在用户访问到这些特性时才会加载。

When you're ready to explore these possibilities, visit the [NgModules](guide/ngmodule) guide.

如果你要了解这些知识，请访问[Angular 模块 (NgModule)](guide/ngmodule)页