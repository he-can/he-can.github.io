---
title: 前后端分离项目之后端Demo
date: 2021-05-13 15:39:11
tags: 
    - java
    - springboot
    - nacos
    - mybatis-plus
    - swagger
    - demo
categories: java
---

![](/前后端分离项目之后端Demo/70.webp)

<!-- more -->

## <sectionNumberC></sectionNumberC> <hTtileC>项目架构</hTtileC>

> <strong class="ptys">xxxx</strong>
>
> > <strong class="ptys">common</strong>
> > > <strong class="ptys">common-utils</strong>
> > >
> > > <strong class="ptys">base-server</strong>
> >
> > <strong class="ptys">server</strong>
> >
> > > <strong class="ptys">xxx-server</strong>
> > >
> > > <strong class="ptys">xxx-server</strong>

## <sectionNumberC></sectionNumberC> <hTtileC>jar包</hTtileC>

### 父工程    版本控制    pom.xml

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.8.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>

<properties>
    <spring-cloud.version>Hoxton.SR1</spring-cloud.version>
    <spring-cloud-alibaba.version>2.1.1.RELEASE</spring-cloud-alibaba.version>
    <mybatis-plus.version>3.0.5</mybatis-plus.version>
    <swagger.version>2.7.0</swagger.version>
    <mysql.version>5.1.47</mysql.version>
    <lombok.version>1.18.16</lombok.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>${spring-cloud-alibaba.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>${mybatis-plus.version}</version>
        </dependency>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>${swagger.version}</version>
        </dependency>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <version>${swagger.version}</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>${mysql.version}</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

### server pom.xml

```xml
<dependencies>
    <dependency>
        <groupId>com.ch</groupId>
        <artifactId>common-utils</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
    <dependency>
        <groupId>com.ch</groupId>
        <artifactId>base-server</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!--nacos 依赖-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
    </dependency>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    </dependency>

    <!--openfeign依赖-->
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>

    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.72</version>
    </dependency>

    <!-- swagger -->
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger2</artifactId>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger-ui</artifactId>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

### common pom.xml

```xml
<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger2</artifactId>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger-ui</artifactId>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <scope>provided</scope>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

## <sectionNumberC></sectionNumberC> <hTtileC>配置</hTtileC>

### 微服务配置

**添加** `bootsrap.yml`

```yaml
spring:
  application:
    name: 服务名
  cloud:
    nacos:
      config:
        # 配置中心服务器地址
        server-addr: localhost:8848
        # 配置文件的后缀名
        file-extension: yaml
        # 共享不同微服务的配置
        shared-dataids: default-service.yaml
        # 实时刷新共享的配置信息
        refreshable-dataids: default-service.yaml
        # 配置名称空间
        namespace: abcd
```

### nacos配置中心

**添加`default-service.yaml`全局默认配置**

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    username: root
    password: 1
  # 返回json的全局时间格式
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

**添加微服务的配置    `服务名.yaml`**

```yaml
server:
    port: 8001
spring:
    datasource:
        url: jdbc:mysql:///crm?serverTimezone=UTC&Unicode=true&characterEncoding=utf-8&useSSL=true
```

## <sectionNumberC></sectionNumberC> <hTtileC>编码</hTtileC>

### common-utils

**创建返回给前台的结果集(common-utils)  `com.ch.utils.vo.R`**

**添加**

```java
@Data
public class R {
    /**
     * 是否成功
     */
    private Boolean success;
    /**
     * 返回码
     */
    private Integer code;
    /**
     * 返回消息
     */
    private String message;
    /**
     * 返回数据
     */
    private Map<String, Object> data = new HashMap<String, Object>();

    /**
     * 构造方法私有化
     */
    private R() {}

    /**
     * 成功
     * @return
     */
    public static R ok() {
        R r = new R();
        r.setSuccess(true);
        r.setCode(ResultCode.SUCCESS);
        r.setMessage("成功");
        return r;
    }

    /**
     * 失败
     * @return
     */
    public static R error() {
        R r = new R();
        r.setSuccess(false);
        r.setCode(ResultCode.ERROR);
        r.setMessage("失败");
        return r;
    }

    /**
     * 链式调用   R.ok().data("", value).data("",value2);
     * @param success
     * @return
     */
    public R success(Boolean success) {
        this.setSuccess(success);
        return this;
    }

    public R code(Integer code) {
        this.setCode(code);
        return this;
    }

    public R message(String message) {
        this.setMessage(message);
        return this;
    }

    public R data(String key, Object value) {
        this.data.put(key, value);
        return this;
    }
}
```

**创建状态码接口(common-utils)  `com.ch.utils.vo.ResultCode`**

```java
public interface ResultCode {
    /**
     * 表示操作成功
     */
    Integer SUCCESS = 20000;
    /**
     * 表示操作失败
     */
    Integer ERROR = 20001;
}
```

### entity 实体类 

**创建 `com.ch.customer.entity.Customer`**

**添加**

```java
import java.io.Serializable;

@Data // lombok
@TableNmae(value = "customer")
public class Customer implements Serializable{
    // id
    // idType.AUTO 自增列
    @TableId(value = "cust_id", type = IdType.AUTO)
    private Integer id;
    // 普通列
    @TableField(value = "cust_name")
    private String name;
}
```

### mapper 数据层 

**创建 `com.ch.customer.mapper.CustomerMapper`**

**添加**

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface CustomerMapper extends BaseMapper<Customer> {
}
```

**<ps>PS: 在java配置类上添加`@MapperScan("com.ch.customer.mapper")`注解</ps>**

### service 业务逻辑层 

**创建 `com.ch.customer.service.CustomerService`**

**添加**

```java
import com.baomidou.mybatisplus.extension.service.IService;

public interface CustomerService extends IService<Customer> {
}
```

**创建 `com.ch.customer.service.impl.CustomerServiceImpl`**

**添加**

```java
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl extends ServiceImpl<CustomerMapper, Customer> implements CustomerService {
}
```

### mybatis-plus连表分页条件查询

**java配置类添加**

```java
/**
 * 分页插件
 * @return
 */
@Bean
public PaginationInterceptor paginationInterceptor() {
    return new PaginationInterceptor();
}
```

**controller**

```java
@ApiOperation(value = "客户分页条件查询")
@PostMapping("/page/{current}/{size}")
public R pageConditionsQuery(@ApiParam(name = "current", value = "页号") @PathVariable("current") Integer current,
                             @ApiParam(name = "size", value = "页大小") @PathVariable("size") Integer size,
                             @ApiParam(name = "customerQuery", value = "查询条件", required = false) 
                             @RequestBody CustomerQuery customerQuery) {
    Page<Customer> customerPage = new Page<>(current, size);
    customerService.pageConditionsQuery(customerPage, customerQuery);
    return R.ok().data("result", customerPage);
}
```

**impl**

```java
@Override
public void pageConditionsQuery(Page<Customer> pageParam, CustomerQuery customerQuery) {
    List<Customer> customers = customerMapper.pageConditionsQuery(pageParam, customerQuery);
    pageParam.setRecords(customers);
}
```

**mapper**

```java
@Select(CustomerSQL.PAGE_CONDITIONS_QUERY_SQL)
public List<Customer> pageConditionsQuery(Page<Customer> pageParam, @Param("cq") CustomerQuery customerQuery);
```

### mybatis-plus 逻辑删除

**java配置类添加**

```java
/**
 * 逻辑删除插件
 * @return
 */
@Bean
public ISqlInjector sqlInjector() {
    return new LogicSqlInjector();
}
```

**在实体类添加**

```java
@TableLogic
private Boolean isDelete;
```

### mybatis-plus 添加或修改时填充

**在实体类添加**

```java
// 该字段在插入操作执行时会自动填充
@TableField(fill = FieldFill.INSERT)
private Date intime;
// 该字段在插入时会自动填充，在修改时也会自动维护更新
@TableField(fill = FieldFill.INSERT_UPDATE)
private Date visitdate;
```

**在baseserver模块创建`com.ch.baseserver.handler.MyMetaObjectHandler`**

**添加**

```java
import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    // 插入时填充
    @Override
    public void insertFill(MetaObject metaObject) {
        this.setFieldValByName("intime", new Date(), metaObject);
        this.setFieldValByName("visitdate", new Date(), metaObject);
    }

    // 修改时填充
    @Override
    public void updateFill(MetaObject metaObject) {
        this.setFieldValByName("visitdate", new Date(), metaObject);
    }
}
```

## 四、测试

### swagger

**在baseserver创建配置类 `com.ch.baseserver.config.SwaggerConfig`**

**添加**

```java
import com.google.common.base.Predicates;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket webApiConfig(){
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("webApi")
                .apiInfo(webApiInfo())
                .select()
                .paths(Predicates.not(PathSelectors.regex("/admin/.*")))
                .paths(Predicates.not(PathSelectors.regex("/error.*")))
                .build();
    }

    private ApiInfo webApiInfo(){
        return new ApiInfoBuilder()
                .title("xxxxAPI文档")
                .description("本文档描述了xxx微服务接口定义")
                .version("1.0")
                .contact(new Contact("xxxx", "http://guigu.com", "xxxx@qq.com"))
                .build();
    }
}
```

**<ps>PS: 在java配置类中添加`@ComponentScan("com.xx")`注解</ps>**














