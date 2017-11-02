app.controller("myController", function($scope, $route, $routeParams, $http, $filter){

     $scope.getCustomers = function(){
        $http.get('/api/customers/').then(function(response){
        $scope.customers = response.data;
            console.log("list customers "+$scope.customers);
        });
    };
    
    $scope.showCustomer = function(){
         var id = $routeParams.id;
         
        $http.get('/api/customers/'+ id).then(function(response){
        $scope.customer = response.data[0];
            console.log($scope.customer);
        });
    };
   
     $scope.addCustomer = function(){
        console.log($scope.customer);
        // alert($scope.customer.firstName);
         $http.post('/api/customers/', $scope.customer).then(function(response){
         window.location.href = '/customers ';
        
            
         });
    };
    
     $scope.updateCustomer = function(){
         var id = $routeParams.id;
         console.log("customers need to  be updated" +$scope.customer+"  id :"+$routeParams.id);
        $http.put('/api/customers/'+ id,$scope.customer).then(function(response){
            console("customer  updated");
          window.location.href = '/ ';
            
        });
    };
    
     $scope.deleteCustomer = function(id){
         var id = id;
         alert("Sure u  want to delete customer "+id);
        $http.delete('/api/customers/'+ id).then(function(response){
        $route.reload()
            
        });
    };
     
        $scope.date = new Date();
        $scope.search=function(){
            $scope.searchQuery = angular.copy($scope.query);
            $scope.customersToFilter = $scope.customers;
            $scope.searchReasult=false;

        }
    
});

