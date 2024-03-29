
    // 读取本地存储的数据  封装为函数 
    // 需求①：读取本地存储数据（封装函数）
    //   如果本地存储有数据，则返回 JSON.parse() 之后的对象
    //   如果本地存储没有数据，则默认写入三条数据，注意存储的利用JSON.stringify() 存 储JSON 格式的数据
    function getLocalData() {
        let data = localStorage.getItem('data')
        if (data) {
          //   如果本地存储有数据，则返回 JSON.parse() 之后的对象
          return JSON.parse(data)  //   {xxxxx}
        } else {
          // 如果本地存储没有数据，则默认写入三条数据，注意存储的利用JSON.stringify() 存 储JSON 格式的数据
          let arr = [
            { stuId: 1001, uname: '欧阳霸天', age: 19, gender: '男', salary: '20000', city: '上海' },
            { stuId: 1002, uname: '令狐霸天', age: 29, gender: '男', salary: '30000', city: '北京' },
            { stuId: 1003, uname: '诸葛霸天', age: 39, gender: '男', salary: '2000', city: '北京' },
          ]
          // 写入到本地存储里面
          localStorage.setItem('data', JSON.stringify(arr))
        //   return arr
        }
      }
      // 先调用一次
      getLocalData()
      // 获取父元素 tbody
      let tbody = document.querySelector('tbody')
      // 添加数据按钮 
      // 获取录入按钮
      let add = document.querySelector('.add')
      // 获取各个表单的元素
      let uname = document.querySelector('.uname')
      let age = document.querySelector('.age')
      let gender = document.querySelector('.gender')
      let salary = document.querySelector('.salary')
      let city = document.querySelector('.city')
      // 渲染函数  把数组里面的数据渲染到页面中
      function render() {
        // 需求②：渲染模块
        // 先读取本地存储数据，然后渲染
        let arr = getLocalData()
  
        // 先干掉以前的数据  让tbody 里面原来的tr 都没有
        tbody.innerHTML = ''
        // 在渲染新的数据
        // 根据数据的条数来渲染增加 tr  
        for (let i = 0; i < arr.length; i++) {
          // 1.创建tr  
          let tr = document.createElement('tr')
          // 2.tr 里面放内容
          tr.innerHTML = `
          <td>${arr[i].stuId}</td>
          <td>${arr[i].uname}</td>
          <td>${arr[i].age}</td>
          <td>${arr[i].gender}</td>
          <td>${arr[i].salary}</td>
          <td>${arr[i].city}</td>
          <td>
            <a href="javascript:"  data-id="${i}">删除</a>
          </td>
          `
          // 3.把tr追加给 tobdy  父元素.appendChild(子元素)
          tbody.appendChild(tr)
  
  
        }
      }
      // 页面加载就调用函数
      render()
  
      add.addEventListener('click', function () {
        // 需求③：添加模块
        // 注意，先取的最新的本地存储数据，然后追加
        let arr = getLocalData()
        // 新增了数据，要把新数据存储到本地存储别，忘记转换
  
  
        // alert(11)
        // 获得表单里面的值   之后追加给 数组 arr  用 push方法
        arr.push({
          // 得到数组最后一条数据的学号 1003    + 1
          stuId: arr[arr.length - 1].stuId + 1,
          uname: uname.value,
          age: age.value,
          gender: gender.value,
          salary: salary.value,
          city: city.value
        })
        // console.log(arr)
  
        // 存储到仓库里面 
        localStorage.setItem('data', JSON.stringify(arr))
  
        // 重新渲染我们的函数
        render()
        // 复原所有的表单数据
        uname.value = age.value = salary.value = ''
        gender.value = '男'
        city.value = '北京'
      })
  
  
      // 删除操作， 删除的也是数组里面的数据 ， 但是我们用事件委托
      tbody.addEventListener('click', function (e) {
        // 读取本地存储里面的数据
        let arr = getLocalData()
        // alert(11)
        // 我们只能点击了链接 a ，才会执行删除操作
        // 那我们怎么知道你点击了a呢？
        // 俺们只能点击了链接才能做删除操作
        // console.dir(e.target.tagName)
        if (e.target.tagName === 'A') {
          // alert('你点击了链接')
          // 删除操作  删除 数组里面的数据  arr.splice(从哪里开始删，1)
          // 我要得到a的id 需要
          // console.log(e.target.id)
          // console.log(e.target.dataset.id)
          arr.splice(e.target.dataset.id, 1)
  
          // 存到本地里面
          localStorage.setItem('data', JSON.stringify(arr))
  
          // 重新渲染我们的函数
          render()
        }
      })