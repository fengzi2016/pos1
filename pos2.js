/**
 * Created by root on 17-7-12.
 */
class Item {

    constructor(barcode, name, unit, price = 0.00) {
        this.barcode = barcode;
        this.name = name;
        this.unit = unit;
        this.price = price;
    }

    static all() {
        return [
            new Item('ITEM000000', '可口可乐', '瓶', 3.00),
            new Item('ITEM000001', '雪碧', '瓶', 3.00),
            new Item('ITEM000002', '苹果', '斤', 5.50),
            new Item('ITEM000003', '荔枝', '斤', 15.00),
            new Item('ITEM000004', '电池', '个', 2.00),
            new Item('ITEM000005', '方便面', '袋', 4.50)
        ];
    }
}
class Promotion {

    constructor(type, barcodes = []) {
        this.type = type;
        this.barcodes = barcodes;
    }

    static all() {
        return [
            new Promotion('BUY_TWO_GET_ONE_FREE', [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ])
        ];
    }
}
var all_collection= [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2'
];
var base_list=Item.all();
var discount=Promotion.all()[0];
var discount_collection=discount.barcodes;
function part(all_collection){
    var barcode_more_collection=[];
    var temp,k=0;
    for(var i=0;i<all_collection.length;i++){
        if(all_collection[i].indexOf('-')>=0){
            temp=all_collection[i].split('-');
            barcode_more_collection[k]={};
            barcode_more_collection[k].barcode=temp[0];
            barcode_more_collection[k].count=Number(temp[1]);
            k++;
        }
    }
    return barcode_more_collection;
}
function compute_count(all_collection,barcode_more_collection){
    var compute_count_a=[];
    var k=0;
    compute_count_a[0]={};
    compute_count_a[0].barcode=all_collection[0];
    compute_count_a[0].count=1;
    for(var i=1;i<all_collection.length;i++){
        for(var j=0;j<compute_count_a.length;j++){
            if(all_collection[i]===compute_count_a[j].barcode){
                compute_count_a[j].count++;
            }
            else if(j===compute_count_a.length-1&&all_collection[i].indexOf('-')<0){
                var object={};
                object.barcode=all_collection[i];
                object.count=1;
                compute_count_a.push(object);
            }
            else if(all_collection[i].indexOf('-')>=0){
                var tag=all_collection[i].split('-');
                for(var s=0;s<compute_count_a.length;s++){
                    if(compute_count_a[s].barcode===tag[0])break;
                }
                if(s!==compute_count_a.length-1){
                    compute_count_a.push(barcode_more_collection[k]);
                    k++;
                    break;
                }
                else{
                    compute_count_a[s].count++;
                    break;
                }
            }
        }
    }
    return compute_count_a;
}
function count_number(base_list,comput_count) {
    var count_number_a=[];
    for(var i=0;i<comput_count.length;i++){
        for(var j=0;j<base_list.length;j++){
            if(comput_count[i].barcode===base_list[j].barcode){
                base_list[j].count=comput_count[i].count;
                count_number_a.push(base_list[j]);
            }
        }
    }
    return count_number_a;
}
function every_save_money(discount_collection,count_number){
    var every_save_money_a=[];
    for(var i=0;i<count_number.length;i++){
        for(var j=0;j<discount_collection.length;j++){
            if(count_number[i].barcode===discount_collection[j]){
                if(count_number[i].count>=2){
                    var free=count_number[i].price;
                    every_save_money_a.push(free);
                }
            }
        }
    }
    return every_save_money_a;
}
function all_save_money(every_save_money){
    var all_save_money_a=0;
    for(var i=0;i<every_save_money.length;i++){
        all_save_money_a+=every_save_money[i];
    }
    return all_save_money_a;
}
function after_save_every_sum(count_number,every_save_money,discount_collection){
    var after_save_every_sum_a=[];
    var k=0;
    for(var i=0;i<count_number.length;i++){
        var flag=0;
        for(var j=0;j<discount_collection.length;j++){
            var sum=count_number[i].count*count_number[i].price;
            if(count_number[i].barcode===discount_collection[j]){
                flag=1;
            }
        }
        if(flag===0)
            after_save_every_sum_a.push(sum);
        else{
            after_save_every_sum_a.push(sum-every_save_money[k]);
            k++;
        }
    }
    return after_save_every_sum_a;
}
function all_sum(after_save_every_sum){
    var all_sum_a=0;
    for(var i=0;i<after_save_every_sum.length;i++){
        all_sum_a+=after_save_every_sum[i];
    }
    return all_sum_a;
}
function print(count_number,after_save_every_sum,all_sum,all_save_money){
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hours=date.getHours();
    var minutes=date.getMinutes();
    var seconds=date.getSeconds();
    function select(time) {
        if(time<10){
            time='0'+time;
        }
        return time;
    }
    month=select(month)
    day=select(day);
    hours=select(hours);
    minutes=select(minutes);
    seconds=select(seconds);
    var dateTime='打印时间：'+year+'年'+month+'月'+day+'日'+' '+hours+':'+minutes+':'+seconds+'\n';
    var str='***<没钱赚商店>收据***';
    var content='';
    for(var i=0;i<count_number.length;i++){
        content+='名称：'+count_number[i].name+'，数量：'+count_number[i].count+count_number[i].unit+'，单价：'+count_number[i].price.toFixed(2)+'(元)，小计：'+
            after_save_every_sum[i].toFixed(2)+'(元)'+'\n';
    }
    str=str+'\n'+dateTime+content+'----------------------'+'\n'+'总计：'+all_sum.toFixed(2)+'(元)'+'\n'+'节省：'+all_save_money.toFixed(2)+'\n'+'**********************';
    return str;
}
var barcodeMoreCollection=part(all_collection);
var computeCount=compute_count(all_collection,barcodeMoreCollection);
var countNumber=count_number(base_list,computeCount);
var everySaveMoney=every_save_money(discount_collection,countNumber);
var allSaveMoney=all_save_money(everySaveMoney);
var afterSaveEverySum=after_save_every_sum(countNumber,everySaveMoney,discount_collection);
var allSum=all_sum(afterSaveEverySum);
var Print=print(countNumber,afterSaveEverySum,allSum,allSaveMoney);
console.log(Print);