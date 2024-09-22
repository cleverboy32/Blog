作为一个前端，写页面结构，写CSS怎么命名? 
就算不用，但你的了解， 让自己的代码更规范。

##### BEM是什么
它是css命名的一种规范。试想，你写了一个页面，有input, button, div, 这些元素是什么样的关系，给他们添加样式的时候，怎么知道他们是一个页面的？ 怎么知道input 是否放在div里面的？ 不要急，这就说到了下面的命名之作用

#### BEM是怎么命名的
```html
<html>
	<div class="loggin-from">
		<input class="loggin-from__input"/>
		<button class="loggin-from__confim">确定</button>	
	</div>
</html>
```
通过上面命名可以很直接看出，input 和button 在div 里面。
这里讲 后面的 __input/__confim 这里后面接两个下划线，表示的是div里面的子元素。
```html
<html>
	<div class="loggin-from--big">
		<input class="loggin-from__input"/>
		<button class="loggin-from__confim">确定</button>	
	</div>
</html>
```
这里说， --big表示添加的描述， 很明显是大的注册表单的样式嘛。

#### BEM总结
好了， 这里loggin-from 相当于一块整体(block)， 里面包含了元素input/button(element), 还有这个块或者一些元素的修饰big(modifier) => BEM
它一般和sass一起使用，在用@C代表块、 @d代表元素、 @m代码修饰符的时候， css可以这样写了
```
@C loggin-from {
	width: 100px;
	height: 100px;
	@m big {
		width: 200px;
		height: 200px;
	}
	@d input {
		color: red;
	}
	@d button {
		color: blue;
	}
}
```
怎么样，这样是不是就不用写那么长了， 而且一看样式文件，就能知道页面布局是什么样的。
**以上写法， 要通过sass 插件配置的**
这里有一个包 ，可以使用[sass-bem-constructor](https://www.npmjs.com/package/sass-bem-constructor)